import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { RfqOverview } from "@/components/rfq-overview";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectRfqPage({ params }: { params: { code: string } }) {
  const { data: project, error } = await supabase.from("projects").select("id, code, name").eq("code", params.code).single();
  if (error || !project) notFound();

  const { data: rfqs } = await supabase.from("rfqs").select("*").eq("project_id", project.id).order("created_at", { ascending: false });
  const rfqIds = (rfqs ?? []).map((r) => r.id);
  const { data: quotes } = rfqIds.length ? await supabase.from("quotes").select("*").in("rfq_id", rfqIds).order("created_at", { ascending: false }) : {"data": []};
  const { data: vendors } = await supabase.from("vendors").select("*").eq("active", true).order("company_name");

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow={`RFQ · ${project.code}`}
          title={`RFQ e Orçamentos - ${project.name}`}
          description="Gerencie concorrências, fornecedores e propostas comerciais do projeto."
          actions={
            <>
              <Link href={`/projects/${project.code}`} className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-900">Voltar ao projeto</Link>
              <Link href={`/projects/${project.code}/rfq/new`} className="rounded-2xl border border-white/20 px-4 py-3 font-medium text-white">Nova RFQ</Link>
            </>
          }
        />
        <RfqOverview rfqs={rfqs ?? []} quotes={quotes ?? []} vendors={vendors ?? []} />
      </div>
    </AppShell>
  );
}
