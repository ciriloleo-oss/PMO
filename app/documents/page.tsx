import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type DocumentRow = Pick<
  Database["public"]["Tables"]["documents"]["Row"],
  | "id"
  | "title"
  | "category"
  | "file_name"
  | "version_no"
  | "is_public"
  | "project_id"
  | "created_at"
>;

export default async function DocumentsPage() {
  const { data, error } = await supabase
    .from("documents")
    .select(
      "id, title, category, file_name, version_no, is_public, project_id, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Erro ao carregar documentos: ${error.message}`);
  }

  const documents: DocumentRow[] = data ?? [];

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow="Repositório central"
          title="Documentos"
          description="Visão consolidada de documentos do sistema com categoria, versão e visibilidade."
        />

        <div className="card p-5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Categoria</th>
                  <th>Arquivo</th>
                  <th>Versão</th>
                  <th>Visibilidade</th>
                  <th>Projeto</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.title}</td>
                    <td>{doc.category}</td>
                    <td>{doc.file_name}</td>
                    <td>v{doc.version_no}</td>
                    <td>{doc.is_public ? "Público" : "Interno"}</td>
                    <td className="text-xs text-slate-500">{doc.project_id}</td>
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