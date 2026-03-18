import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { PublicProjectCard } from "@/components/public-project-card";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PublicProjectRow = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "id" | "code" | "name" | "public_summary" | "physical_progress" | "planned_end_date" | "status"
>;

export default async function ResidentPortalPage() {
  const { data, error } = await supabase
    .from("projects")
    .select("id, code, name, public_summary, physical_progress, planned_end_date, status")
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Erro ao carregar portal do morador: ${error.message}`);
  }

  const projects: PublicProjectRow[] = data ?? [];

  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow="Camada pública"
          title="Portal do Morador"
          description="Acompanhamento transparente dos projetos públicos do Reserva da Serra, com linguagem simples e foco nas atualizações mais relevantes."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <PublicProjectCard key={project.code} project={project} />
          ))}
        </div>

        {projects.length === 0 ? (
          <div className="card p-5 text-sm text-slate-600">
            Nenhum projeto público disponível no momento.
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}