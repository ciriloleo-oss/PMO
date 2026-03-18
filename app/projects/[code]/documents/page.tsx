import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ProjectDocumentsTable } from "@/components/project-documents-table";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectDocumentsPage({ params }: { params: { code: string } }) {
  const { data: project, error } = await supabase.from("projects").select("id, code, name").eq("code", params.code).single();
  if (error || !project) notFound();

  const { data: documents, error: docError } = await supabase
    .from("documents")
    .select("*")
    .eq("project_id", project.id)
    .order("created_at", { ascending: false });

  if (docError) throw new Error(`Erro ao carregar documentos: ${docError.message}`);

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow={`Documentos · ${project.code}`}
          title={`Documentos - ${project.name}`}
          description="Repositório documental do projeto com controle de categoria, versão e visibilidade."
          actions={
            <>
              <Link href={`/projects/${project.code}`} className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-900">Voltar ao projeto</Link>
              <Link href={`/projects/${project.code}/documents/new`} className="rounded-2xl border border-white/20 px-4 py-3 font-medium text-white">Novo documento</Link>
            </>
          }
        />
        <ProjectDocumentsTable documents={documents ?? []} />
      </div>
    </AppShell>
  );
}
