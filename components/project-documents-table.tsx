import { formatDateBR } from "@/lib/format";
import type { Database } from "@/types/database";

type Doc = Database["public"]["Tables"]["documents"]["Row"];

export function ProjectDocumentsTable({ documents }: { documents: Doc[] }) {
  if (!documents.length) {
    return <div className="card p-5 text-sm text-slate-600">Nenhum documento cadastrado para este projeto.</div>;
  }

  return (
    <div className="card p-5">
      <h2 className="text-lg font-semibold">Documentos do projeto</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Título</th>
              <th>Arquivo</th>
              <th>Versão</th>
              <th>Visibilidade</th>
              <th>Criado em</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.category}</td>
                <td>{doc.title}</td>
                <td>{doc.file_name}</td>
                <td>v{doc.version_no}</td>
                <td>{doc.is_public ? "Público" : "Interno"}</td>
                <td>{formatDateBR(doc.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
