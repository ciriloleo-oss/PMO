import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ProjectsTable } from "@/components/projects-table";
import { supabase } from "@/lib/supabase";

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, code, name, status, visibility, planned_budget, physical_progress, planned_end_date, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Erro ao carregar projetos: ${error.message}`);
  }

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow="Módulo 1"
          title="Projetos"
          description="Lista real de projetos com busca, filtros e ações de cadastro e edição."
        />
        <ProjectsTable projects={projects ?? []} />
      </div>
    </AppShell>
  );
}
