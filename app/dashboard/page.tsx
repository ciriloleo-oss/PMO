import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { supabase } from "@/lib/supabase";
import { formatCurrencyBRL, humanizeStatus } from "@/lib/format";
import type { Database } from "@/types/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProjectRow = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  | "id"
  | "code"
  | "name"
  | "status"
  | "planned_budget"
  | "actual_cost"
  | "physical_progress"
  | "visibility"
  | "planned_start_date"
  | "planned_end_date"
>;

function barWidth(value: number, total: number) {
  if (!total) return "0%";
  return `${Math.max(8, Math.round((value / total) * 100))}%`;
}

export default async function DashboardPage() {
  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, code, name, status, planned_budget, actual_cost, physical_progress, visibility, planned_start_date, planned_end_date"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Erro ao carregar dashboard: ${error.message}`);
  }

  const projects: ProjectRow[] = data ?? [];

  const totalProjects = projects.length;

  const totalBudget = projects.reduce((sum, project) => {
    return sum + Number(project.planned_budget ?? 0);
  }, 0);

  const totalCost = projects.reduce((sum, project) => {
    return sum + Number(project.actual_cost ?? 0);
  }, 0);

  const avgProgress =
    totalProjects > 0
      ? Math.round(
          projects.reduce((sum, project) => {
            return sum + Number(project.physical_progress ?? 0);
          }, 0) / totalProjects
        )
      : 0;

  const statusBuckets = [
    "em_definicao",
    "em_rfq",
    "em_orcamento",
    "em_aprovacao",
    "aprovado",
    "em_execucao",
    "concluido",
  ].map((status) => ({
    status,
    count: projects.filter((p) => p.status === status).length,
  }));

  const maxStatusCount = Math.max(1, ...statusBuckets.map((b) => b.count));

  const publicCount = projects.filter((p) => p.visibility === "public").length;
  const internalCount = totalProjects - publicCount;

  const ganttProjects = projects.slice(0, 6);

  const cpmSteps = [
    { id: "A", label: "Escopo", duration: 8, dep: "-" },
    { id: "B", label: "RFQ", duration: 12, dep: "A" },
    { id: "C", label: "Orçamentos", duration: 7, dep: "B" },
    { id: "D", label: "Assembleia", duration: 10, dep: "C" },
    { id: "E", label: "Execução", duration: 35, dep: "D" },
    { id: "F", label: "Aceite final", duration: 5, dep: "E" },
  ];

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow="Indicadores da carteira"
          title="Dashboard Executivo"
          description="Visão consolidada do portfólio do Residencial Reserva da Serra com indicadores, quadro Gantt executivo e leitura simplificada de caminho crítico."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Projetos ativos"
            value={totalProjects}
            helper="Carteira consolidada"
          />
          <MetricCard
            label="Orçamento planejado"
            value={formatCurrencyBRL(totalBudget)}
            helper="Base total aprovada / em análise"
          />
          <MetricCard
            label="Custo realizado"
            value={formatCurrencyBRL(totalCost)}
            helper="Gasto acumulado"
          />
          <MetricCard
            label="Avanço médio"
            value={`${avgProgress}%`}
            helper="Progresso físico médio"
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="card p-5">
            <h2 className="text-lg font-semibold">Status da carteira</h2>
            <div className="mt-4 space-y-3">
              {statusBuckets.map((bucket) => (
                <div key={bucket.status}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>{humanizeStatus(bucket.status)}</span>
                    <span className="font-medium">{bucket.count}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-slate-900"
                      style={{ width: barWidth(bucket.count, maxStatusCount) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-lg font-semibold">Exposição pública x interna</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Projetos públicos
                </div>
                <div className="mt-2 text-3xl font-bold text-blue-700">
                  {publicCount}
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-blue-600"
                    style={{ width: barWidth(publicCount, totalProjects || 1) }}
                  />
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Projetos internos
                </div>
                <div className="mt-2 text-3xl font-bold text-slate-900">
                  {internalCount}
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-slate-700"
                    style={{ width: barWidth(internalCount, totalProjects || 1) }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Gantt executivo dos projetos</h2>
            <div className="text-sm text-slate-500">
              Leitura visual resumida do andamento
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-[260px_repeat(12,minmax(0,1fr))] gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <div>Projeto</div>
                <div>Jan</div>
                <div>Fev</div>
                <div>Mar</div>
                <div>Abr</div>
                <div>Mai</div>
                <div>Jun</div>
                <div>Jul</div>
                <div>Ago</div>
                <div>Set</div>
                <div>Out</div>
                <div>Nov</div>
                <div>Dez</div>
              </div>

              <div className="mt-3 space-y-3">
                {ganttProjects.map((project, index) => {
                  const startMonth = project.planned_start_date
                    ? new Date(project.planned_start_date).getMonth()
                    : index;
                  const endMonth = project.planned_end_date
                    ? new Date(project.planned_end_date).getMonth()
                    : Math.min(11, startMonth + 2);
                  const span = Math.max(1, endMonth - startMonth + 1);

                  return (
                    <div
                      key={project.id}
                      className="grid grid-cols-[260px_repeat(12,minmax(0,1fr))] gap-2 items-center"
                    >
                      <div className="pr-3">
                        <div className="font-medium text-slate-900">
                          {project.code}
                        </div>
                        <div className="text-sm text-slate-600">
                          {project.name}
                        </div>
                      </div>
                      {Array.from({ length: 12 }).map((_, month) => {
                        const active = month >= startMonth && month <= endMonth;
                        const isCurrent =
                          active &&
                          month ===
                            Math.min(
                              endMonth,
                              startMonth +
                                Math.max(
                                  0,
                                  Math.round(
                                    (span *
                                      Number(project.physical_progress || 0)) /
                                      100
                                  ) - 1
                                )
                            );

                        return (
                          <div key={month} className="h-8 rounded-lg bg-slate-100">
                            {active ? (
                              <div
                                className={`h-8 rounded-lg ${
                                  isCurrent ? "bg-blue-600" : "bg-slate-900/85"
                                }`}
                                title={`${project.name} · ${project.physical_progress}%`}
                              />
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
          <div className="card p-5">
            <h2 className="text-lg font-semibold">
              Caminho crítico simplificado (PERT / CPM)
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Exemplo executivo das etapas críticas para projetos típicos do
              condomínio, útil para leitura gerencial e comunicação com diretoria.
            </p>

            <div className="mt-5 grid gap-3">
              {cpmSteps.map((step, index) => (
                <div key={step.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Atividade {step.id}
                      </div>
                      <div className="mt-1 font-medium text-slate-900">
                        {step.label}
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-semibold text-slate-900">
                        {step.duration} dias
                      </div>
                      <div className="text-slate-500">Dependência: {step.dep}</div>
                    </div>
                  </div>
                  {index < cpmSteps.length - 1 ? (
                    <div className="mt-4 h-1 rounded-full bg-slate-200" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-lg font-semibold">Projetos com maior atenção</h2>
            <div className="mt-4 space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        {humanizeStatus(project.status)}
                      </div>
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium">
                      {project.physical_progress}%
                    </div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{
                        width: `${Math.max(
                          6,
                          Number(project.physical_progress || 0)
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}