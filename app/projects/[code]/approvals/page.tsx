import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ApprovalsOverview } from "@/components/approvals-overview";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectApprovalsPage({ params }: { params: { code: string } }) {
  const { data: project, error } = await supabase.from("projects").select("id, code, name").eq("code", params.code).single();
  if (error || !project) notFound();

  const { data: assemblies } = await supabase.from("assemblies").select("*").eq("project_id", project.id).order("meeting_date", { ascending: false });
  const { data: approvals } = await supabase.from("approvals").select("*").eq("project_id", project.id).order("created_at", { ascending: false });

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow={`Governança · ${project.code}`}
          title={`Assembleias e Aprovações - ${project.name}`}
          description="Consolide assembleias, decisões e aprovações do projeto."
          actions={
            <>
              <Link href={`/projects/${project.code}`} className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-900">Voltar ao projeto</Link>
              <Link href={`/projects/${project.code}/approvals/new`} className="rounded-2xl border border-white/20 px-4 py-3 font-medium text-white">Nova aprovação</Link>
            </>
          }
        />
        <ApprovalsOverview assemblies={assemblies ?? []} approvals={approvals ?? []} />
      </div>
    </AppShell>
  );
}
