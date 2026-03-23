create extension if not exists "hypopg" with schema "extensions";

create extension if not exists "index_advisor" with schema "extensions";

drop extension if exists "pg_net";


  create table "public"."achievements" (
    "id" text not null,
    "title" text not null,
    "issuer" text not null,
    "year" integer not null,
    "type" text not null,
    "image_path" text,
    "credential_url" text,
    "valid_until" text,
    "featured" boolean default false,
    "is_visible" boolean default true,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."achievements" enable row level security;


  create table "public"."activity" (
    "id" uuid not null default gen_random_uuid(),
    "type" text not null,
    "title" text not null,
    "description" text,
    "url" text,
    "timestamp" timestamp with time zone default now()
      );


alter table "public"."activity" enable row level security;


  create table "public"."changelog_entries" (
    "id" uuid not null default gen_random_uuid(),
    "version" text not null,
    "title" text not null,
    "content" text,
    "date" date default CURRENT_DATE,
    "type" text default 'minor'::text
      );


alter table "public"."changelog_entries" enable row level security;


  create table "public"."guestbook" (
    "id" uuid not null default gen_random_uuid(),
    "user_name" text not null,
    "user_avatar" text,
    "user_provider" text,
    "message" text not null,
    "cybill_reply" text,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."guestbook" enable row level security;


  create table "public"."learning_log" (
    "id" uuid not null default gen_random_uuid(),
    "topic" text not null,
    "progress" integer default 0,
    "status" text default 'learning'::text,
    "last_updated" timestamp with time zone default now()
      );


alter table "public"."learning_log" enable row level security;


  create table "public"."now_playing" (
    "id" text not null default 'current'::text,
    "track_name" text,
    "artist_name" text,
    "album_art" text,
    "is_playing" boolean default false,
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."now_playing" enable row level security;


  create table "public"."project_views" (
    "id" uuid not null default gen_random_uuid(),
    "project_id" uuid,
    "view_count" integer default 0,
    "last_viewed" timestamp with time zone default now()
      );


alter table "public"."project_views" enable row level security;


  create table "public"."projects" (
    "id" text not null,
    "name" text not null,
    "description" text,
    "cover_image" text,
    "status" text default 'wip'::text,
    "tech" text[],
    "github_url" text,
    "live_url" text,
    "sort_order" integer default 0,
    "is_pinned" boolean default false,
    "is_visible" boolean default true,
    "views" integer default 0,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."projects" enable row level security;


  create table "public"."settings" (
    "id" integer not null default 1,
    "open_to_work" boolean default true,
    "currently_learning" text default 'Next.js 16 & Tailwind v4'::text,
    "maintenance_mode" boolean default false,
    "now_playing" text
      );


alter table "public"."settings" enable row level security;


  create table "public"."uses_items" (
    "id" text not null,
    "name" text not null,
    "description" text,
    "category" text not null,
    "url" text,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."uses_items" enable row level security;

CREATE UNIQUE INDEX achievements_pkey ON public.achievements USING btree (id);

CREATE UNIQUE INDEX activity_pkey ON public.activity USING btree (id);

CREATE UNIQUE INDEX changelog_entries_pkey ON public.changelog_entries USING btree (id);

CREATE UNIQUE INDEX guestbook_pkey ON public.guestbook USING btree (id);

CREATE UNIQUE INDEX learning_log_pkey ON public.learning_log USING btree (id);

CREATE UNIQUE INDEX now_playing_pkey ON public.now_playing USING btree (id);

CREATE UNIQUE INDEX project_views_pkey ON public.project_views USING btree (id);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX settings_pkey ON public.settings USING btree (id);

CREATE UNIQUE INDEX uses_items_pkey ON public.uses_items USING btree (id);

alter table "public"."achievements" add constraint "achievements_pkey" PRIMARY KEY using index "achievements_pkey";

alter table "public"."activity" add constraint "activity_pkey" PRIMARY KEY using index "activity_pkey";

alter table "public"."changelog_entries" add constraint "changelog_entries_pkey" PRIMARY KEY using index "changelog_entries_pkey";

alter table "public"."guestbook" add constraint "guestbook_pkey" PRIMARY KEY using index "guestbook_pkey";

alter table "public"."learning_log" add constraint "learning_log_pkey" PRIMARY KEY using index "learning_log_pkey";

alter table "public"."now_playing" add constraint "now_playing_pkey" PRIMARY KEY using index "now_playing_pkey";

alter table "public"."project_views" add constraint "project_views_pkey" PRIMARY KEY using index "project_views_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."settings" add constraint "settings_pkey" PRIMARY KEY using index "settings_pkey";

alter table "public"."uses_items" add constraint "uses_items_pkey" PRIMARY KEY using index "uses_items_pkey";

alter table "public"."changelog_entries" add constraint "changelog_entries_type_check" CHECK ((type = ANY (ARRAY['major'::text, 'minor'::text, 'patch'::text, 'fix'::text]))) not valid;

alter table "public"."changelog_entries" validate constraint "changelog_entries_type_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.increment_view(page_slug text)
 RETURNS integer
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare
  current_count int;
begin
  update public.projects
  set views = coalesce(views, 0) + 1
  where id = page_slug -- Unified identifier: id is used as the slug
  returning views into current_count;
  
  if not found then
    return 0;
  end if;
  
  return current_count;
end;
$function$
;

grant delete on table "public"."achievements" to "anon";

grant insert on table "public"."achievements" to "anon";

grant references on table "public"."achievements" to "anon";

grant select on table "public"."achievements" to "anon";

grant trigger on table "public"."achievements" to "anon";

grant truncate on table "public"."achievements" to "anon";

grant update on table "public"."achievements" to "anon";

grant delete on table "public"."achievements" to "authenticated";

grant insert on table "public"."achievements" to "authenticated";

grant references on table "public"."achievements" to "authenticated";

grant select on table "public"."achievements" to "authenticated";

grant trigger on table "public"."achievements" to "authenticated";

grant truncate on table "public"."achievements" to "authenticated";

grant update on table "public"."achievements" to "authenticated";

grant delete on table "public"."achievements" to "service_role";

grant insert on table "public"."achievements" to "service_role";

grant references on table "public"."achievements" to "service_role";

grant select on table "public"."achievements" to "service_role";

grant trigger on table "public"."achievements" to "service_role";

grant truncate on table "public"."achievements" to "service_role";

grant update on table "public"."achievements" to "service_role";

grant delete on table "public"."activity" to "anon";

grant insert on table "public"."activity" to "anon";

grant references on table "public"."activity" to "anon";

grant select on table "public"."activity" to "anon";

grant trigger on table "public"."activity" to "anon";

grant truncate on table "public"."activity" to "anon";

grant update on table "public"."activity" to "anon";

grant delete on table "public"."activity" to "authenticated";

grant insert on table "public"."activity" to "authenticated";

grant references on table "public"."activity" to "authenticated";

grant select on table "public"."activity" to "authenticated";

grant trigger on table "public"."activity" to "authenticated";

grant truncate on table "public"."activity" to "authenticated";

grant update on table "public"."activity" to "authenticated";

grant delete on table "public"."activity" to "service_role";

grant insert on table "public"."activity" to "service_role";

grant references on table "public"."activity" to "service_role";

grant select on table "public"."activity" to "service_role";

grant trigger on table "public"."activity" to "service_role";

grant truncate on table "public"."activity" to "service_role";

grant update on table "public"."activity" to "service_role";

grant delete on table "public"."changelog_entries" to "anon";

grant insert on table "public"."changelog_entries" to "anon";

grant references on table "public"."changelog_entries" to "anon";

grant select on table "public"."changelog_entries" to "anon";

grant trigger on table "public"."changelog_entries" to "anon";

grant truncate on table "public"."changelog_entries" to "anon";

grant update on table "public"."changelog_entries" to "anon";

grant delete on table "public"."changelog_entries" to "authenticated";

grant insert on table "public"."changelog_entries" to "authenticated";

grant references on table "public"."changelog_entries" to "authenticated";

grant select on table "public"."changelog_entries" to "authenticated";

grant trigger on table "public"."changelog_entries" to "authenticated";

grant truncate on table "public"."changelog_entries" to "authenticated";

grant update on table "public"."changelog_entries" to "authenticated";

grant delete on table "public"."changelog_entries" to "service_role";

grant insert on table "public"."changelog_entries" to "service_role";

grant references on table "public"."changelog_entries" to "service_role";

grant select on table "public"."changelog_entries" to "service_role";

grant trigger on table "public"."changelog_entries" to "service_role";

grant truncate on table "public"."changelog_entries" to "service_role";

grant update on table "public"."changelog_entries" to "service_role";

grant delete on table "public"."guestbook" to "anon";

grant insert on table "public"."guestbook" to "anon";

grant references on table "public"."guestbook" to "anon";

grant select on table "public"."guestbook" to "anon";

grant trigger on table "public"."guestbook" to "anon";

grant truncate on table "public"."guestbook" to "anon";

grant update on table "public"."guestbook" to "anon";

grant delete on table "public"."guestbook" to "authenticated";

grant insert on table "public"."guestbook" to "authenticated";

grant references on table "public"."guestbook" to "authenticated";

grant select on table "public"."guestbook" to "authenticated";

grant trigger on table "public"."guestbook" to "authenticated";

grant truncate on table "public"."guestbook" to "authenticated";

grant update on table "public"."guestbook" to "authenticated";

grant delete on table "public"."guestbook" to "service_role";

grant insert on table "public"."guestbook" to "service_role";

grant references on table "public"."guestbook" to "service_role";

grant select on table "public"."guestbook" to "service_role";

grant trigger on table "public"."guestbook" to "service_role";

grant truncate on table "public"."guestbook" to "service_role";

grant update on table "public"."guestbook" to "service_role";

grant delete on table "public"."learning_log" to "anon";

grant insert on table "public"."learning_log" to "anon";

grant references on table "public"."learning_log" to "anon";

grant select on table "public"."learning_log" to "anon";

grant trigger on table "public"."learning_log" to "anon";

grant truncate on table "public"."learning_log" to "anon";

grant update on table "public"."learning_log" to "anon";

grant delete on table "public"."learning_log" to "authenticated";

grant insert on table "public"."learning_log" to "authenticated";

grant references on table "public"."learning_log" to "authenticated";

grant select on table "public"."learning_log" to "authenticated";

grant trigger on table "public"."learning_log" to "authenticated";

grant truncate on table "public"."learning_log" to "authenticated";

grant update on table "public"."learning_log" to "authenticated";

grant delete on table "public"."learning_log" to "service_role";

grant insert on table "public"."learning_log" to "service_role";

grant references on table "public"."learning_log" to "service_role";

grant select on table "public"."learning_log" to "service_role";

grant trigger on table "public"."learning_log" to "service_role";

grant truncate on table "public"."learning_log" to "service_role";

grant update on table "public"."learning_log" to "service_role";

grant delete on table "public"."now_playing" to "anon";

grant insert on table "public"."now_playing" to "anon";

grant references on table "public"."now_playing" to "anon";

grant select on table "public"."now_playing" to "anon";

grant trigger on table "public"."now_playing" to "anon";

grant truncate on table "public"."now_playing" to "anon";

grant update on table "public"."now_playing" to "anon";

grant delete on table "public"."now_playing" to "authenticated";

grant insert on table "public"."now_playing" to "authenticated";

grant references on table "public"."now_playing" to "authenticated";

grant select on table "public"."now_playing" to "authenticated";

grant trigger on table "public"."now_playing" to "authenticated";

grant truncate on table "public"."now_playing" to "authenticated";

grant update on table "public"."now_playing" to "authenticated";

grant delete on table "public"."now_playing" to "service_role";

grant insert on table "public"."now_playing" to "service_role";

grant references on table "public"."now_playing" to "service_role";

grant select on table "public"."now_playing" to "service_role";

grant trigger on table "public"."now_playing" to "service_role";

grant truncate on table "public"."now_playing" to "service_role";

grant update on table "public"."now_playing" to "service_role";

grant delete on table "public"."project_views" to "anon";

grant insert on table "public"."project_views" to "anon";

grant references on table "public"."project_views" to "anon";

grant select on table "public"."project_views" to "anon";

grant trigger on table "public"."project_views" to "anon";

grant truncate on table "public"."project_views" to "anon";

grant update on table "public"."project_views" to "anon";

grant delete on table "public"."project_views" to "authenticated";

grant insert on table "public"."project_views" to "authenticated";

grant references on table "public"."project_views" to "authenticated";

grant select on table "public"."project_views" to "authenticated";

grant trigger on table "public"."project_views" to "authenticated";

grant truncate on table "public"."project_views" to "authenticated";

grant update on table "public"."project_views" to "authenticated";

grant delete on table "public"."project_views" to "service_role";

grant insert on table "public"."project_views" to "service_role";

grant references on table "public"."project_views" to "service_role";

grant select on table "public"."project_views" to "service_role";

grant trigger on table "public"."project_views" to "service_role";

grant truncate on table "public"."project_views" to "service_role";

grant update on table "public"."project_views" to "service_role";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

grant delete on table "public"."settings" to "anon";

grant insert on table "public"."settings" to "anon";

grant references on table "public"."settings" to "anon";

grant select on table "public"."settings" to "anon";

grant trigger on table "public"."settings" to "anon";

grant truncate on table "public"."settings" to "anon";

grant update on table "public"."settings" to "anon";

grant delete on table "public"."settings" to "authenticated";

grant insert on table "public"."settings" to "authenticated";

grant references on table "public"."settings" to "authenticated";

grant select on table "public"."settings" to "authenticated";

grant trigger on table "public"."settings" to "authenticated";

grant truncate on table "public"."settings" to "authenticated";

grant update on table "public"."settings" to "authenticated";

grant delete on table "public"."settings" to "service_role";

grant insert on table "public"."settings" to "service_role";

grant references on table "public"."settings" to "service_role";

grant select on table "public"."settings" to "service_role";

grant trigger on table "public"."settings" to "service_role";

grant truncate on table "public"."settings" to "service_role";

grant update on table "public"."settings" to "service_role";

grant delete on table "public"."uses_items" to "anon";

grant insert on table "public"."uses_items" to "anon";

grant references on table "public"."uses_items" to "anon";

grant select on table "public"."uses_items" to "anon";

grant trigger on table "public"."uses_items" to "anon";

grant truncate on table "public"."uses_items" to "anon";

grant update on table "public"."uses_items" to "anon";

grant delete on table "public"."uses_items" to "authenticated";

grant insert on table "public"."uses_items" to "authenticated";

grant references on table "public"."uses_items" to "authenticated";

grant select on table "public"."uses_items" to "authenticated";

grant trigger on table "public"."uses_items" to "authenticated";

grant truncate on table "public"."uses_items" to "authenticated";

grant update on table "public"."uses_items" to "authenticated";

grant delete on table "public"."uses_items" to "service_role";

grant insert on table "public"."uses_items" to "service_role";

grant references on table "public"."uses_items" to "service_role";

grant select on table "public"."uses_items" to "service_role";

grant trigger on table "public"."uses_items" to "service_role";

grant truncate on table "public"."uses_items" to "service_role";

grant update on table "public"."uses_items" to "service_role";


  create policy "Allow public read access to achievements"
  on "public"."achievements"
  as permissive
  for select
  to public
using (true);



  create policy "Public Read Access"
  on "public"."activity"
  as permissive
  for select
  to public
using (true);



  create policy "Public Read Access"
  on "public"."changelog_entries"
  as permissive
  for select
  to public
using (true);



  create policy "Allow public insert to guestbook"
  on "public"."guestbook"
  as permissive
  for insert
  to public
with check (true);



  create policy "Allow public read access to guestbook"
  on "public"."guestbook"
  as permissive
  for select
  to public
using (true);



  create policy "Public Read Access"
  on "public"."learning_log"
  as permissive
  for select
  to public
using (true);



  create policy "Public Read Access"
  on "public"."now_playing"
  as permissive
  for select
  to public
using (true);



  create policy "Public Read Access"
  on "public"."project_views"
  as permissive
  for select
  to public
using (true);



  create policy "Allow public read access to projects"
  on "public"."projects"
  as permissive
  for select
  to public
using (true);



  create policy "Allow public read access to settings"
  on "public"."settings"
  as permissive
  for select
  to public
using (true);



  create policy "Allow public read access to uses_items"
  on "public"."uses_items"
  as permissive
  for select
  to public
using (true);



