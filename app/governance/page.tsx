import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GovernancePage() {
  const { data: assemblies, error: aErr } = await supabase.from("assemblies").select("*").order("meeting_date", { ascending: false });
  const { data: approvals, error: apErr } = await supabase.from("approvals").select("*").order("created_at", { ascending: false });
  if (aErr) throw new Error(`Erro ao carregar assembleias: ${aErr.message}`);
  if (apErr) throw new Error(`Erro ao carregar aprovações: ${apErr.message}`);

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader eyebrow="Governança" title="Assembleias e Aprovações" description="Visão consolidada de decisões, assembleias e aprovações do sistema." />
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="card p-5 overflow-x-auto">
            <h2 className="text-lg font-semibold">Assembleias</h2>
            <table className="w-full mt-4">
              <thead><tr><th>Título</th><th>Data</th><th>Decisão</th></tr></thead>
              <tbody>
                {(assemblies ?? []).map((assembly) => (
                  <tr key={assembly.id}>
                    <td>{assembly.title}</td>
                    <td>{assembly.meeting_date}</td>
                    <td>{assembly.decision_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5 overflow-x-auto">
            <h2 className="text-lg font-semibold">Aprovações</h2>
            <table className="w-full mt-4">
              <thead><tr><th>Tipo</th><th>Status</th><th>Data</th><th>Projeto</th></tr></thead>
              <tbody>
                {(approvals ?? []).map((approval) => (
                  <tr key={approval.id}>
                    <td>{approval.approval_type}</td>
                    <td>{approval.approval_status}</td>
                    <td>{approval.approval_date ?? "-"}</td>
                    <td className="text-xs text-slate-500">{approval.project_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
