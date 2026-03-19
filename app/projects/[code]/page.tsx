import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { ProjectUpdatesTimeline } from "@/components/project-updates-timeline";
import { supabase } from "@/lib/supabase";
import { formatCurrencyBRL, formatDateBR, humanizeStatus } from "@/lib/format";
import type { Database } from "@/types/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type UpdateRow = Pick<
  Database["public"]["Tables"]["project_updates"]["Row"],
  | "id"
  | "project_id"
  | "update_date"
  | "title"
  | "summary"
  | "physical_progress"
  | "financial_progress"
  | "published_to_residents"
  | "created_at"
>;

export default async function ProjectDetailPage({
  params,
}: {
  params: { code: string };
}) {
  const { data: projectData, error } = await supabase
    .from("projects")
    .select("*")
    .eq("code", params.code)
    .single();

  if (error || !projectData) notFound();

  const project: ProjectRow = projectData;

  const { data: updatesData, error: updatesError } = await supabase
    .from("project_updates")
    .select(
      "id, project_id, update_date, title, summary, physical_progress, financial_progress, published_to_residents, created_at"
    )
    .eq("project_id", project.id)
    .order("update_date", { ascending: false });

  if (updatesError) {
    throw new Error(`Erro ao carregar atualizações: ${updatesError.message}`);
  }

  const updates: UpdateRow[] = updatesData ?? [];

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow={project.code}
          title={project.name}
          description={project.description ?? "Sem descrição cadastrada."}
          actions={
            <>
              <Link
                href={`/projects/${project.code}/edit`}
                className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-900"
              >
                Editar projeto
              </Link>
              <Link
                href={`/projects/${project.code}/updates/new`}
                className="rounded-2xl border border-white/20 px-4 py-3 font-medium text-white"
              >
                Nova atualização
              </Link>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Status"
            value={humanizeStatus(project.status)}
            helper="Situação atual"
          />
          <MetricCard
            label="Progresso físico"
            value={`${project.physical_progress}%`}
            helper="Andamento geral"
          />
          <MetricCard
            label="Orçamento planejado"
            value={formatCurrencyBRL(project.planned_budget)}
            helper="Base aprovada"
          />
          <MetricCard
            label="Fim planejado"
            value={formatDateBR(project.planned_end_date)}
            helper="Previsão atual"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Link href={`/projects/${project.code}/documents`} className="card p-5">
            <h2 className="text-lg font-semibold">Documentos</h2>
            <p className="mt-2 text-sm text-slate-600">Repositório do projeto.</p>
          </Link>

          <Link href={`/projects/${project.code}/rfq`} className="card p-5">
            <h2 className="text-lg font-semibold">RFQ e Orçamentos</h2>
            <p className="mt-2 text-sm text-slate-600">
              Concorrências, fornecedores e propostas.
            </p>
          </Link>

          <Link href={`/projects/${project.code}/approvals`} className="card p-5">
            <h2 className="text-lg font-semibold">Aprovações</h2>
            <p className="mt-2 text-sm text-slate-600">
              Assembleias e governança do projeto.
            </p>
          </Link>

          <Link href={`/projects/${project.code}/updates/new`} className="card p-5">
            <h2 className="text-lg font-semibold">Nova atualização</h2>
            <p className="mt-2 text-sm text-slate-600">
              Registrar avanço da obra.
            </p>
          </Link>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="card p-5">
            <h2 className="text-lg font-semibold">Resumo</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">Objetivo</dt>
                <dd>{project.objective ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Justificativa</dt>
                <dd>{project.justification ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Visibilidade</dt>
                <dd>{project.visibility === "public" ? "Público" : "Interno"}</dd>
              </div>
            </dl>
          </div>

          <div className="card p-5">
            <h2 className="text-lg font-semibold">Indicadores das atualizações</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Total de updates
                </div>
                <div className="mt-2 text-2xl font-bold">{updates.length}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Updates públicos
                </div>
                <div className="mt-2 text-2xl font-bold">
                  {updates.filter((u) => u.published_to_residents).length}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProjectUpdatesTimeline updates={updates} />
      </div>
    </AppShell>
  );
}