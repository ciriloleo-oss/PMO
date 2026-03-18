import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

export default function HomePage() {
  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader
          eyebrow="Starter funcional"
          title="PMO Reserva da Serra"
          description="Base inicial do sistema já pronta para ler os dados reais do Supabase."
          actions={
            <>
              <Link href="/dashboard" className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-900">
                Abrir dashboard
              </Link>
              <Link href="/projects" className="rounded-2xl border border-white/20 px-4 py-3 font-medium text-white">
                Ver projetos
              </Link>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Link href="/dashboard" className="card p-5">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <p className="mt-2 text-sm text-slate-600">Indicadores reais da carteira de projetos.</p>
          </Link>
          <Link href="/projects" className="card p-5">
            <h2 className="text-lg font-semibold">Projetos</h2>
            <p className="mt-2 text-sm text-slate-600">Lista conectada à tabela projects.</p>
          </Link>
          <div className="card p-5">
            <h2 className="text-lg font-semibold">Próximo passo</h2>
            <p className="mt-2 text-sm text-slate-600">
              Evoluir CRUD, autenticação e detalhe completo do projeto.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
