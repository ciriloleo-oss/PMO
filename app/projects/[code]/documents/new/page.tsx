import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { DocumentForm } from "@/components/document-form";
import { defaultDocumentFormValues } from "@/types/document-form";
import { supabase } from "@/lib/supabase";

export default async function NewDocumentPage({ params }: { params: { code: string } }) {
  const { data: project, error } = await supabase.from("projects").select("id, code, name").eq("code", params.code).single();
  if (error || !project) notFound();

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
          initialValues={{ ...defaultDocumentFormValues, related_entity_id: project.id }}
        />
      </div>
    </AppShell>
  );
}
