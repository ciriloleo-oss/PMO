import { formatDateBR } from "@/lib/format";
import type { Database } from "@/types/database";

type UpdateRow = Pick<
  Database["public"]["Tables"]["project_updates"]["Row"],
  | "id"
  | "update_date"
  | "title"
  | "summary"
  | "physical_progress"
  | "financial_progress"
  | "published_to_residents"
>;

export function PublicUpdatesTimeline({ updates }: { updates: UpdateRow[] }) {
  if (!updates.length) {
    return (
      <div className="card p-5 text-sm text-slate-600">
        Ainda não há atualizações públicas disponíveis para este projeto.
      </div>
    );
  }

  return (
    <div className="card p-5">
      <h2 className="text-lg font-semibold">Atualizações públicas</h2>
      <div className="mt-4 space-y-4">
        {updates.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {formatDateBR(item.update_date)} · Progresso físico{" "}
                  {item.physical_progress}% · Progresso financeiro{" "}
                  {item.financial_progress}%
                </div>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Publicado
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {item.summary ?? "Sem resumo."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}