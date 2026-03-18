import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ApprovalForm } from "@/components/approval-form";
import { defaultApprovalFormValues } from "@/types/approval-form";
import { supabase } from "@/lib/supabase";

export default async function NewApprovalPage({ params }: { params: { code: string } }) {
  const { data: project, error } = await supabase.from("projects").select("id, code, name").eq("code", params.code).single();
  if (error || !project) notFound();

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader eyebrow={`Governança · ${project.code}`} title={`Nova aprovação - ${project.name}`} description="Cadastre assembleia e aprovação vinculadas ao projeto." />
        <ApprovalForm projectId={project.id} projectCode={project.code} initialValues={defaultApprovalFormValues} />
      </div>
    </AppShell>
  );
}
