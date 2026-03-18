import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ProjectForm } from "@/components/project-form";
import { supabase } from "@/lib/supabase";
import { projectRowToFormValues } from "@/lib/project-form";

export default async function EditProjectPage({ params }: { params: { code: string } }) {
  const { data: project, error } = await supabase.from("projects").select("*").eq("code", params.code).single();
  if (error || !project) notFound();

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader eyebrow="CRUD de projetos" title={`Editar ${project.code}`} description="Atualize os dados principais do projeto direto no banco." />
        <ProjectForm mode="edit" projectId={project.id} initialValues={projectRowToFormValues(project)} />
      </div>
    </AppShell>
  );
}
