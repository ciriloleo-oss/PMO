import type { Database } from "@/types/database";

type Doc = Database["public"]["Tables"]["documents"]["Row"];

export function PublicDocumentsTable({ documents }: { documents: Doc[] }) {
  if (!documents.length) {
    return <div className="card p-5 text-sm text-slate-600">Nenhum documento público disponível para este projeto.</div>;
  }

  return (
    <div className="card p-5">
      <h2 className="text-lg font-semibold">Documentos públicos</h2>
      <div className="mt-4 space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="font-medium">{doc.title}</div>
            <div className="mt-1 text-xs text-slate-500">
              {doc.category} · {doc.file_name} · v{doc.version_no}
            </div>
            <div className="mt-3 text-sm text-slate-600 break-all">{doc.file_path}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
