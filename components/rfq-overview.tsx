import type { Database } from "@/types/database";

type Rfq = Database["public"]["Tables"]["rfqs"]["Row"];
type Quote = Database["public"]["Tables"]["quotes"]["Row"];
type Vendor = Database["public"]["Tables"]["vendors"]["Row"];

export function RfqOverview({
  rfqs,
  quotes,
  vendors,
}: {
  rfqs: Rfq[];
  quotes: Quote[];
  vendors: Vendor[];
}) {
  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h2 className="text-lg font-semibold">RFQs do projeto</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>Título</th>
                <th>Status</th>
                <th>Emissão</th>
                <th>Prazo</th>
              </tr>
            </thead>
            <tbody>
              {rfqs.length ? rfqs.map((rfq) => (
                <tr key={rfq.id}>
                  <td>{rfq.title}</td>
                  <td>{rfq.status}</td>
                  <td>{rfq.issue_date ?? "-"}</td>
                  <td>{rfq.due_date ?? "-"}</td>
                </tr>
              )) : <tr><td colSpan={4} className="text-sm text-slate-500">Nenhuma RFQ cadastrada.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-lg font-semibold">Propostas recebidas</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Fornecedor</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Score técnico</th>
                </tr>
              </thead>
              <tbody>
                {quotes.length ? quotes.map((quote) => {
                  const vendor = vendors.find((v) => v.id === quote.vendor_id);
                  return (
                    <tr key={quote.id}>
                      <td>{vendor?.company_name ?? quote.vendor_id}</td>
                      <td>R$ {Number(quote.amount || 0).toLocaleString("pt-BR")}</td>
                      <td>{quote.status}</td>
                      <td>{quote.technical_score ?? "-"}</td>
                    </tr>
                  );
                }) : <tr><td colSpan={4} className="text-sm text-slate-500">Nenhuma proposta cadastrada.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-lg font-semibold">Fornecedores cadastrados</h2>
          <div className="mt-4 space-y-3">
            {vendors.length ? vendors.map((vendor) => (
              <div key={vendor.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="font-medium">{vendor.company_name}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {vendor.contact_name ?? "-"} · {vendor.email ?? "-"} · {vendor.phone ?? "-"}
                </div>
                <div className="mt-2 text-sm text-slate-600">{vendor.category ?? "Sem categoria"}</div>
              </div>
            )) : <div className="text-sm text-slate-500">Nenhum fornecedor encontrado.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
