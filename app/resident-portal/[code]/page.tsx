import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { PublicUpdatesTimeline } from "@/components/public-updates-timeline";
import { PublicDocumentsTable } from "@/components/public-documents-table";
import { supabase } from "@/lib/supabase";
import { formatDateBR, humanizeStatus } from "@/lib/format";
import type { Database } from "@/types/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProjectRow = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "id" | "code" | "name" | "public_summary" | "physical_progress" | "planned_end_date" | "status" | "visibility"
>;

type UpdateRow = Database["public"]["Tables"]["project_updates"]["Row"];
type DocumentRow = Database["public"]["Tables"]["documents"]["Row"];

export default async function ResidentPortalProjectPage({
  params,
}: {
  params: { code: string };
}) {
  const { data: projectData, error } = await supabase
    .from("projects")
    .select("id, code, name, public_summary, physical_progress, planned_end_date, status, visibility")
    .eq("code", params.code)
    .eq("visibility", "public")
    .single();

  if (error || !projectData) notFound();

  const project: ProjectRow = projectData;

  const { data: updatesData, error: updatesError } = await supabase
    .from("project_updates")
    .select(
      "id, project_id, update_date, title, summary, physical_progress, financial_progress, published_to_residents, created_at"
    )
    .eq("project_id", project.id)
    .eq("published_to_residents", true)
    .order("update_date", { ascending: false });

  if (updatesError) {
    throw new Error(`Erro ao carregar atualizações públicas: ${updatesError.message}`);
  }

  const { data: documentsData, error: documentsError } = await supabase
    .from("documents")
    .select("*")
    .eq("project_id", project.id)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (documentsError) {
    throw new Error(`Erro ao carregar documentos públicos: ${documentsError.message}`);
  }

  const updates: UpdateRow[] = updatesData ?? [];
  const documents: DocumentRow[] = documentsData ?? [];

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow={`Portal do Morador · ${project.code}`}
          title={project.name}
          description={
            project.public_summary ??
            "Projeto público disponível para acompanhamento dos moradores."
          }
          actions={
            <Link
              href="/resident-portal"
              className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-900"
            >
              Voltar ao portal
            </Link>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            label="Status"
            value={humanizeStatus(project.status)}
            helper="Situação atual"
          />
          <MetricCard
            label="Progresso físico"
            value={`${project.physical_progress}%`}
            helper="Andamento informado"
          />
          <MetricCard
            label="Fim planejado"
            value={formatDateBR(project.planned_end_date)}
            helper="Previsão atual"
          />
        </div>

        <PublicUpdatesTimeline updates={updates} />
        <PublicDocumentsTable documents={documents} />
      </div>
    </AppShell>
  );
}