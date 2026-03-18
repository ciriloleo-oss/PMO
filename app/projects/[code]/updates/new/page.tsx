import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { UpdateForm } from "@/components/update-form";
import { defaultUpdateFormValues } from "@/types/update-form";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

type ProjectRow = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "id" | "code" | "name"
>;

export default async function NewUpdatePage({
  params,
}: {
  params: { code: string };
}) {
  const { data, error } = await supabase
    .from("projects")
    .select("id, code, name")
    .eq("code", params.code)
    .single();

  if (error || !data) notFound();

  const project: ProjectRow = data;

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow={`Atualizações · ${project.code}`}
          title={`Nova atualização - ${project.name}`}
          description="Registre o andamento real do projeto e defina se a atualização será pública ou interna."
        />
        <UpdateForm
          projectId={project.id}
          projectCode={project.code}
          initialValues={defaultUpdateFormValues}
        />
      </div>
    </AppShell>
  );
}