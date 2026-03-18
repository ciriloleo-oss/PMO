import Link from "next/link";
import { formatDateBR, humanizeStatus } from "@/lib/format";
import type { Database } from "@/types/database";

type Project = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "code" | "name" | "public_summary" | "physical_progress" | "planned_end_date" | "status"
>;

export function PublicProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/resident-portal/${project.code}`} className="card block p-5 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{project.code}</div>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">{project.name}</h2>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {project.physical_progress}%
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {project.public_summary ?? "Projeto público disponível para acompanhamento dos moradores."}
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
        <span className="rounded-full bg-slate-100 px-3 py-1">{humanizeStatus(project.status)}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">Fim planejado: {formatDateBR(project.planned_end_date)}</span>
      </div>
    </Link>
  );
}
