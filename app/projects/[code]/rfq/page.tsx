import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { RfqOverview } from "@/components/rfq-overview";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProjectRow = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "id" | "code" | "name"
>;

type RfqRow = Database["public"]["Tables"]["rfqs"]["Row"];
type QuoteRow = Database["public"]["Tables"]["quotes"]["Row"];
type VendorRow = Database["public"]["Tables"]["vendors"]["Row"];

export default async function ProjectRfqPage({
  params,
}: {
  params: { code: string };
}) {
  const { data: projectData, error } = await supabase
    .from("projects")
    .select("id, code, name")
    .eq("code", params.code)
    .single();

  if (error || !projectData) notFound();

  const project: ProjectRow = projectData;

  const { data: rfqsData, error: rfqsError } = await supabase
    .from("rfqs")
    .select("*")
    .eq("project_id", project.id)
    .order("created_at", { ascending: false });

  if (rfqsError) {
    throw new Error(`Erro ao carregar RFQs: ${rfqsError.message}`);
  }

  const rfqs: RfqRow[] = rfqsData ?? [];
  const rfqIds = rfqs.map((r) => r.id);

  let quotes: QuoteRow[] = [];
  if (rfqIds.length > 0) {
    const { data: quotesData, error: quotesError } = await supabase
      .from("quotes")
      .select("*")
      .in("rfq_id", rfqIds)
      .order("created_at", { ascending: false });

    if (quotesError) {
      throw new Error(`Erro ao carregar propostas: ${quotesError.message}`);
    }

    quotes = quotesData ?? [];
  }

  const { data: vendorsData, error: vendorsError } = await supabase
    .from("vendors")
    .select("*")
    .eq("active", true)
    .order("company_name");

  if (vendorsError) {
    throw new Error(`Erro ao carregar fornecedores: ${vendorsError.message}`);
  }

  const vendors: VendorRow[] = vendorsData ?? [];

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow={`RFQ · ${project.code}`}
          title={`RFQ e Orçamentos - ${project.name}`}
          description="Gerencie concorrências, fornecedores e propostas comerciais do projeto."
          actions={
            <>
              <Link
                href={`/projects/${project.code}`}
                className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-900"
              >
                Voltar ao projeto
              </Link>
              <Link
                href={`/projects/${project.code}/rfq/new`}
                className="rounded-2xl border border-white/20 px-4 py-3 font-medium text-white"
              >
                Nova RFQ
              </Link>
            </>
          }
        />
        <RfqOverview rfqs={rfqs} quotes={quotes} vendors={vendors} />
      </div>
    </AppShell>
  );
}