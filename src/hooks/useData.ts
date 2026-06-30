"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { env } from "../lib/env";

// ============================================
// HELPERS
// ============================================

const lowerCaseReplace = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-");

// ============================================
export type ProjectStatus = "live" | "wip" | "preview";

export interface Project {
  id: string;
  name: string;
  slug?: string; // New: Unique identifier for detail page
  description?: string;
  content?: string; // New: Markdown case study
  role?: string; // New: Lead Developer, UI Designer, etc.
  timeline?: string; // New: Jan 2024 - Mar 2024
  dominant_color?: string; // New: Hex or RGB for Spotlight
  dominantColor?: string; // CamelCase version
  coverImage?: string; // Match ProjectsGrid interface
  cover_image?: string; // Supabase column name
  status?: ProjectStatus;
  tech: string[];
  github_url?: string;
  githubUrl?: string; // CamelCase version
  live_url?: string;
  liveUrl?: string; // CamelCase version
  sort_order?: number;
  is_pinned?: boolean;
  isPinned?: boolean; // CamelCase version
  is_visible?: boolean;
  views?: number;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: number;
  type: "certificate" | "participation";
  category?: string;
  credential_id?: string;
  image_path?: string;
  url?: string;
  credential_url?: string; // Keep for compatibility
  featured?: boolean;
  is_visible: boolean;
  created_at: string;
}

export interface CurrentlyLearning {
  currently_learning?: string;
  currently_building?: string;
}

// ============================================
// MOCK DATA — removed. Dashboard and fallbacks no longer use fake data.
// ponytail: restore if explicit dev/test mode needed.

// ============================================
// HOOKS
// ============================================

/**
 * Fetch projects from Supabase
 * Filters: is_visible = true, is_active = true (if column exists)
 * Order: sort_order ASC, then created_at DESC
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);

        const query = supabase
          .from("projects")
          .select("*")
          .eq("is_visible", true)
          .order("sort_order", { ascending: true, nullsFirst: false })
          .order("created_at", { ascending: false });

        // Add is_active filter if column exists (check migration)
        // query = query.eq("is_active", true);

        const { data, error: queryError } = await query;

        if (queryError) {
          console.warn(
            "Supabase Fetch Failed. No projects.",
            queryError.message,
          );
          setProjects([]);
          return;
        }

        const mappedProjects = (data || []).map((p) => ({
          ...p,
          coverImage: p.cover_image || p.coverImage || "",
          githubUrl: p.github_url || p.githubUrl,
          liveUrl: p.live_url || p.liveUrl,
          isPinned: p.is_pinned || p.isPinned || false,
          dominantColor: p.dominant_color || p.dominantColor || "#00ffb3",
          slug: p.slug || lowerCaseReplace(p.name),
        }));

        if (mappedProjects.length === 0) {
          setProjects([]);
        } else {
          setProjects(mappedProjects);
        }
      } catch {
        console.warn("Network Error. No projects available.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

/**
 * Fetch achievements from Supabase
 * Filters: is_visible = true
 * Order: year DESC, then created_at DESC
 */
export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("achievements")
          .select("*")
          .eq("is_visible", true)
          .order("year", { ascending: false })
          .order("created_at", { ascending: false });

        if (error) {
          console.warn("Supabase Fetch Failed. No achievements.");
          setAchievements([]);
          return;
        }

        const mapped = (data || []).map((a) => ({
          ...a,
          url: a.credential_url || a.url,
          is_visible: a.is_visible ?? true,
        }));

        setAchievements(mapped);
      } catch {
        console.warn("Network Error. No achievements.");
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAchievements();
  }, []);

  return { achievements, loading, error };
}

/**
 * Fetch currently learning from settings
 * Note: This might already be implemented in your existing code
 */
export function useCurrentlyLearning() {
  const [data, setData] = useState<CurrentlyLearning>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("settings")
          .select("currently_learning, currently_building")
          .eq("id", env.SETTINGS_ROW_ID)
          .single();

        if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found, which is OK
        setData(data || {});
      } catch {
        console.error("Error fetching settings:");
        setError("Failed to fetch settings");
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { data, loading, error };
}

/**
 * Fetch a single project by its slug
 */
export function useProjectBySlug(slug: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchProject() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: queryError } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .single();

        if (queryError) {
          // If slug column search fails, use DB-level ilike filter instead of fetching all rows
          if (queryError.code === "PGRST116" && slug) {
            const { data: fallbackData } = await supabase
              .from("projects")
              .select("*")
              .ilike("name", slug.replace(/-/g, " "))
              .limit(1);
            const fallback = fallbackData?.[0];
            if (fallback) {
              const mappedFallback = {
                ...fallback,
                coverImage: fallback.cover_image || fallback.coverImage || "",
                githubUrl: fallback.github_url || fallback.githubUrl,
                liveUrl: fallback.live_url || fallback.liveUrl,
                isPinned: fallback.is_pinned || fallback.isPinned || false,
                dominantColor:
                  fallback.dominant_color ||
                  fallback.dominantColor ||
                  "#00ffb3",
                slug: fallback.slug || lowerCaseReplace(fallback.name),
              };
              setProject(mappedFallback);
              return;
            }
          }
          throw queryError;
        }

        const mappedProject = {
          ...data,
          coverImage: data.cover_image || data.coverImage || "",
          githubUrl: data.github_url || data.githubUrl,
          liveUrl: data.live_url || data.liveUrl,
          isPinned: data.is_pinned || data.isPinned || false,
          dominantColor: data.dominant_color || data.dominantColor || "#00ffb3",
          slug: data.slug || lowerCaseReplace(data.name),
        };

        setProject(mappedProject);
      } catch {
        console.error("Error fetching project by slug:");
        setError("Failed to fetch project");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  return { project, loading, error };
}

/**
 * Combined hook for all data
 * Useful for pages that need multiple data sources
 */
export function useAllData() {
  const {
    projects: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useProjects();
  const {
    achievements: achievementsData,
    loading: achievementsLoading,
    error: achievementsError,
  } = useAchievements();
  const {
    data: settingsData,
    loading: settingsLoading,
    error: settingsError,
  } = useCurrentlyLearning();

  return {
    projects: projectsData,
    achievements: achievementsData,
    currentlyLearning: settingsData.currently_learning,
    currentlyBuilding: settingsData.currently_building,
    loading: projectsLoading || achievementsLoading || settingsLoading,
    error: projectsError || achievementsError || settingsError,
  };
}
