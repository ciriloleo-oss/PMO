import { formatDateBR } from "@/lib/format";
import type { Database } from "@/types/database";

type UpdateRow = Database["public"]["Tables"]["project_updates"]["Row"];

export function ProjectUpdatesTimeline({ updates }: { updates: UpdateRow[] }) {
  if (!updates.length) {
    return <div className="card p-5 text-sm text-slate-600">Nenhuma atualização cadastrada para este projeto ainda.</div>;
  }

  return (
    <div className="card p-5">
      <h2 className="text-lg font-semibold">Timeline de atualizações</h2>
      <div className="mt-4 space-y-4">
        {updates.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {formatDateBR(item.update_date)} · Físico {item.physical_progress}% · Financeiro {item.financial_progress}% · {item.published_to_residents ? "Público" : "Interno"}
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${item.published_to_residents ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-700"}`}>
                {item.published_to_residents ? "Portal do morador" : "Uso interno"}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary ?? "Sem resumo."}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
