import type { Database } from "@/types/database";

type ProjectRow = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  | "id"
  | "code"
  | "name"
  | "status"
  | "physical_progress"
  | "planned_start_date"
  | "planned_end_date"
  | "visibility"
>;

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function safeMonth(dateValue: string | null, fallback: number) {
  if (!dateValue) return fallback;
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return fallback;
  return d.getMonth();
}

function isDelayed(project: ProjectRow) {
  if (!project.planned_end_date) return false;
  const end = new Date(project.planned_end_date);
  const today = new Date();
  return end < today && Number(project.physical_progress || 0) < 100;
}

function humanizeStatus(status: string) {
  return status.replaceAll("_", " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export function GanttBoard({ projects }: { projects: ProjectRow[] }) {
  if (!projects.length) {
    return (
      <div className="card p-5 text-sm text-slate-600">
        Nenhum projeto encontrado para montar o Gantt.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Cronograma mestre</h2>
            <p className="mt-1 text-sm text-slate-600">
              Visão executiva baseada nas datas planejadas e no progresso físico registrado.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">Prazo planejado</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">Progresso dentro da barra</span>
            <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">Atrasado</span>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <div className="min-w-[1100px]">
            <div className="grid grid-cols-[280px_repeat(12,minmax(0,1fr))] gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <div>Projeto</div>
              {MONTHS.map((month) => (
                <div key={month}>{month}</div>
              ))}
            </div>

            <div className="mt-3 space-y-3">
              {projects.map((project, index) => {
                const startMonth = safeMonth(project.planned_start_date, index % 12);
                const endMonth = safeMonth(project.planned_end_date, Math.min(11, startMonth + 2));
                const progress = Math.max(0, Math.min(100, Number(project.physical_progress || 0)));
                const delayed = isDelayed(project);

                return (
                  <div
                    key={project.id}
                    className="grid grid-cols-[280px_repeat(12,minmax(0,1fr))] gap-2 items-center"
                  >
                    <div className="pr-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-medium text-slate-900">{project.code}</div>
                          <div className="text-sm text-slate-600">{project.name}</div>
                        </div>
                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                            delayed
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {progress}%
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-slate-500">
                        <span>{humanizeStatus(project.status)}</span>
                        <span>·</span>
                        <span>{project.visibility === "public" ? "Público" : "Interno"}</span>
                      </div>
                    </div>

                    {Array.from({ length: 12 }).map((_, month) => {
                      const active = month >= startMonth && month <= endMonth;
                      const totalSpan = Math.max(1, endMonth - startMonth + 1);
                      const progressSpan = Math.max(
                        startMonth,
                        Math.min(
                          endMonth,
                          startMonth + Math.round((progress / 100) * totalSpan) - 1
                        )
                      );

                      return (
                        <div key={month} className="h-10 rounded-xl bg-slate-100 relative overflow-hidden">
                          {active ? (
                            <div
                              className={`absolute inset-y-1 left-0 right-0 rounded-lg ${
                                delayed ? "bg-red-200" : "bg-slate-800/85"
                              }`}
                            />
                          ) : null}

                          {active && month <= progressSpan ? (
                            <div className="absolute inset-y-2 left-1 right-1 rounded-md bg-blue-500" />
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

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="card p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total de projetos</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{projects.length}</div>
          <p className="mt-2 text-sm text-slate-600">Projetos considerados no cronograma mestre.</p>
        </div>

        <div className="card p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Projetos atrasados</div>
          <div className="mt-2 text-3xl font-bold text-red-700">{projects.filter(isDelayed).length}</div>
          <p className="mt-2 text-sm text-slate-600">Com prazo encerrado e progresso menor que 100%.</p>
        </div>

        <div className="card p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Avanço médio</div>
          <div className="mt-2 text-3xl font-bold text-blue-700">
            {projects.length
              ? Math.round(
                  projects.reduce((sum, p) => sum + Number(p.physical_progress || 0), 0) / projects.length
                )
              : 0}
            %
          </div>
          <p className="mt-2 text-sm text-slate-600">Leitura executiva do portfólio.</p>
        </div>
      </div>
    </div>
  );
}
