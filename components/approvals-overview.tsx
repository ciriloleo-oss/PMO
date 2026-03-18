import type { Database } from "@/types/database";

type Assembly = Database["public"]["Tables"]["assemblies"]["Row"];
type Approval = Database["public"]["Tables"]["approvals"]["Row"];

export function ApprovalsOverview({
  assemblies,
  approvals,
}: {
  assemblies: Assembly[];
  approvals: Approval[];
}) {
  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h2 className="text-lg font-semibold">Assembleias vinculadas</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>Título</th>
                <th>Data</th>
                <th>Decisão</th>
              </tr>
            </thead>
            <tbody>
              {assemblies.length ? assemblies.map((assembly) => (
                <tr key={assembly.id}>
                  <td>{assembly.title}</td>
                  <td>{assembly.meeting_date}</td>
                  <td>{assembly.decision_status}</td>
                </tr>
              )) : <tr><td colSpan={3} className="text-sm text-slate-500">Nenhuma assembleia cadastrada.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="text-lg font-semibold">Aprovações</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Status</th>
                <th>Data</th>
                <th>Comentários</th>
              </tr>
            </thead>
            <tbody>
              {approvals.length ? approvals.map((approval) => (
                <tr key={approval.id}>
                  <td>{approval.approval_type}</td>
                  <td>{approval.approval_status}</td>
                  <td>{approval.approval_date ?? "-"}</td>
                  <td>{approval.comments ?? "-"}</td>
                </tr>
              )) : <tr><td colSpan={4} className="text-sm text-slate-500">Nenhuma aprovação cadastrada.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
