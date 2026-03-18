import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { DocumentForm } from "@/components/document-form";
import { defaultDocumentFormValues } from "@/types/document-form";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

type ProjectRow = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "id" | "code" | "name"
>;

export default async function NewDocumentPage({
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
          eyebrow={`Documentos · ${project.code}`}
          title={`Novo documento - ${project.name}`}
          description="Cadastre metadados do documento e defina se ele será público ou interno."
        />
        <DocumentForm
          projectId={project.id}
          projectCode={project.code}
          initialValues={{
            ...defaultDocumentFormValues,
            related_entity_id: project.id,
          }}
        />
      </div>
    </AppShell>
  );
}