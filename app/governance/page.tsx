import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type AssemblyRow = Pick<
  Database["public"]["Tables"]["assemblies"]["Row"],
  "id" | "title" | "meeting_date" | "decision_status"
>;

type ApprovalRow = Pick<
  Database["public"]["Tables"]["approvals"]["Row"],
  "id" | "approval_type" | "approval_status" | "approval_date" | "project_id"
>;

export default async function GovernancePage() {
  const { data: assembliesData, error: aErr } = await supabase
    .from("assemblies")
    .select("id, title, meeting_date, decision_status")
    .order("meeting_date", { ascending: false });

  const { data: approvalsData, error: apErr } = await supabase
    .from("approvals")
    .select("id, approval_type, approval_status, approval_date, project_id")
    .order("created_at", { ascending: false });

  if (aErr) throw new Error(`Erro ao carregar assembleias: ${aErr.message}`);
  if (apErr) throw new Error(`Erro ao carregar aprovações: ${apErr.message}`);

  const assemblies: AssemblyRow[] = assembliesData ?? [];
  const approvals: ApprovalRow[] = approvalsData ?? [];

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow="Governança"
          title="Assembleias e Aprovações"
          description="Visão consolidada de decisões, assembleias e aprovações do sistema."
        />

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="card p-5 overflow-x-auto">
            <h2 className="text-lg font-semibold">Assembleias</h2>
            <table className="mt-4 w-full">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Data</th>
                  <th>Decisão</th>
                </tr>
              </thead>
              <tbody>
                {assemblies.map((assembly) => (
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
            <table className="mt-4 w-full">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Projeto</th>
                </tr>
              </thead>
              <tbody>
                {approvals.map((approval) => (
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