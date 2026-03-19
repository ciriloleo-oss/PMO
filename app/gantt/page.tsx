import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { GanttBoard } from "@/components/gantt-board";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

type ProjectRow = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  | "id"
  | "code"
  | "name"
  | "status"
  | "physical_progress"
  | "planned_start_date"
  | "planned_end_date"
  | "visibility"
>;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GanttPage() {
  const { data, error } = await supabase
    .from("projects")
    .select("id, code, name, status, physical_progress, planned_start_date, planned_end_date, visibility")
    .order("planned_start_date", { ascending: true });

  if (error) {
    throw new Error(`Erro ao carregar Gantt: ${error.message}`);
  }

  const projects: ProjectRow[] = data ?? [];

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow="Planejamento executivo"
          title="Gantt Mestre"
          description="Organize e acompanhe os projetos do PMO."
        />
        <GanttBoard projects={projects} />
      </div>
    </AppShell>
  );
}
