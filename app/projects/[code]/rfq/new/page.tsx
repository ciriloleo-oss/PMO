import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { RfqForm } from "@/components/rfq-form";
import { defaultRfqFormValues } from "@/types/rfq-form";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

type ProjectRow = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "id" | "code" | "name"
>;

export default async function NewRfqPage({
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
          eyebrow={`RFQ · ${project.code}`}
          title={`Nova RFQ - ${project.name}`}
          description="Cadastre uma nova concorrência do projeto."
        />
        <RfqForm
          projectId={project.id}
          projectCode={project.code}
          initialValues={defaultRfqFormValues}
        />
      </div>
    </AppShell>
  );
}