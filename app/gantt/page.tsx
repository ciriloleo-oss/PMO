import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { GanttBoard } from "@/components/gantt-board";
import { supabase } from "@/lib/supabase";

export default async function GanttPage() {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("planned_start_date");

  const projects = data ?? [];

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader title="Gantt Mestre" description="Visão executiva dos projetos" />
        <GanttBoard projects={projects} />
      </div>
    </AppShell>
  );
}
