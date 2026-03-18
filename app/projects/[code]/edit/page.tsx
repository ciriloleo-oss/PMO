import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ProjectForm } from "@/components/project-form";
import { supabase } from "@/lib/supabase";
import { projectRowToFormValues } from "@/lib/project-form";
import type { Database } from "@/types/database";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

export default async function EditProjectPage({
  params,
}: {
  params: { code: string };
}) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("code", params.code)
    .single();

  if (error || !data) notFound();

  const project: ProjectRow = data;

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow="CRUD de projetos"
          title={`Editar ${project.code}`}
          description="Atualize os dados principais do projeto direto no banco."
        />
        <ProjectForm
          mode="edit"
          projectId={project.id}
          initialValues={projectRowToFormValues(project)}
        />
      </div>
    </AppShell>
  );
}