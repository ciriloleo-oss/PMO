import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RfqPage() {
  const { data: rfqs, error } = await supabase.from("rfqs").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(`Erro ao carregar RFQs: ${error.message}`);

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader eyebrow="Compras e concorrência" title="RFQ e Orçamentos" description="Visão consolidada das concorrências e cotações do sistema." />
        <div className="card p-5 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr><th>Título</th><th>Status</th><th>Emissão</th><th>Prazo</th><th>Projeto</th></tr>
            </thead>
            <tbody>
              {(rfqs ?? []).map((rfq) => (
                <tr key={rfq.id}>
                  <td>{rfq.title}</td>
                  <td>{rfq.status}</td>
                  <td>{rfq.issue_date ?? "-"}</td>
                  <td>{rfq.due_date ?? "-"}</td>
                  <td className="text-xs text-slate-500">{rfq.project_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
