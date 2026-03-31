"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// ============================================
// HELPERS
// ============================================

const lowerCaseReplace = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

// ============================================
// TYPES
// ============================================

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
  status?: string;
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
  type: string; // 'certificate' | 'participation', etc.
  category?: string; // New: Software Engineering, AI, etc.
  credential_id?: string; // New: ID from issuer
  image_path?: string;
  credential_url?: string;
  featured?: boolean;
  is_visible?: boolean;
  created_at: string;
}

export interface CurrentlyLearning {
  currently_learning?: string;
  currently_building?: string;
}

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

        if (queryError) throw queryError;

        // Map Supabase data to Project interface
        const mappedProjects = (data || []).map((p) => ({
          ...p,
          coverImage: p.cover_image || p.coverImage || "",
          githubUrl: p.github_url || p.githubUrl,
          liveUrl: p.live_url || p.liveUrl,
          isPinned: p.is_pinned || p.isPinned || false,
          dominantColor: p.dominant_color || p.dominantColor || "#00ffb3",
          slug: p.slug || lowerCaseReplace(p.name),
        }));

        setProjects(mappedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch projects",
        );
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

        if (error) throw error;
        setAchievements(data || []);
      } catch (err) {
        console.error("Error fetching achievements:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch achievements",
        );
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
          .eq("id", 1)
          .single();

        if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found, which is OK
        setData(data || {});
      } catch (err) {
        console.error("Error fetching settings:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch settings",
        );
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
          // If slug column search fails, try fallback name matching for backward compatibility
          if (queryError.code === "PGRST116") {
             const { data: allData } = await supabase.from("projects").select("*");
             const fallback = (allData || []).find(p => lowerCaseReplace(p.name) === slug);
             if (fallback) {
                const mappedFallback = {
                  ...fallback,
                  coverImage: fallback.cover_image || fallback.coverImage || "",
                  githubUrl: fallback.github_url || fallback.githubUrl,
                  liveUrl: fallback.live_url || fallback.liveUrl,
                  isPinned: fallback.is_pinned || fallback.isPinned || false,
                  dominantColor: fallback.dominant_color || fallback.dominantColor || "#00ffb3",
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
      } catch (err) {
        console.error("Error fetching project by slug:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch project");
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
