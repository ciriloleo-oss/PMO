import Link from "next/link";
import Image from "next/image";
import {
  FolderKanban,
  FileText,
  ShieldCheck,
  Users,
  LayoutDashboard,
  ReceiptText,
  CalendarRange,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/gantt", label: "Gantt", icon: CalendarRange },
  { href: "/projects", label: "Projetos", icon: FolderKanban },
  { href: "/documents", label: "Documentos", icon: FileText },
  { href: "/rfq", label: "RFQ", icon: ReceiptText },
  { href: "/governance", label: "Governança", icon: ShieldCheck },
  { href: "/resident-portal", label: "Portal do Morador", icon: Users },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[300px_1fr]">
      <aside className="bg-slate-950 text-white lg:min-h-screen">
        <div className="sticky top-0 p-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="rounded-2xl bg-white p-3">
              <Image
                src="/reserva.png"
                alt="Residencial Reserva da Serra"
                width={300}
                height={86}
                className="h-auto w-full"
                priority
              />
            </div>
            <h1 className="mt-4 text-lg font-semibold">PMO Reserva da Serra</h1>
            <p className="mt-1 text-sm text-slate-300">
              Sistema integrado de gestão de projetos do Reserva da Serra.
            </p>
          </div>

          <nav className="mt-4 space-y-2">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <main>{children}</main>
    </div>
  );
}
