"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatCurrencyBRL, formatDateBR, humanizeStatus } from "@/lib/format";
import type { Database } from "@/types/database";

type Project = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  | "id"
  | "code"
  | "name"
  | "status"
  | "visibility"
  | "planned_budget"
  | "physical_progress"
  | "planned_end_date"
  | "created_at"
>;

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [visibility, setVisibility] = useState("all");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        project.code.toLowerCase().includes(query.toLowerCase()) ||
        project.name.toLowerCase().includes(query.toLowerCase());

      const matchesStatus = status === "all" ? true : project.status === status;
      const matchesVisibility =
        visibility === "all" ? true : project.visibility === visibility;

      return matchesQuery && matchesStatus && matchesVisibility;
    });
  }, [projects, query, status, visibility]);

  return (
    <div className="card p-5">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:flex-wrap">
        <input
          className="rounded-2xl border border-slate-200 px-3 py-2 text-sm"
          placeholder="Buscar por código ou nome"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="rounded-2xl border border-slate-200 px-3 py-2 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">Todos os status</option>
          <option value="em_definicao">Em definição</option>
          <option value="em_rfq">Em RFQ</option>
          <option value="em_orcamento">Em orçamento</option>
          <option value="em_aprovacao">Em aprovação</option>
          <option value="aprovado">Aprovado</option>
          <option value="em_execucao">Em execução</option>
          <option value="suspenso">Suspenso</option>
          <option value="concluido">Concluído</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <select
          className="rounded-2xl border border-slate-200 px-3 py-2 text-sm"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="all">Todas as visibilidades</option>
          <option value="internal">Interno</option>
          <option value="public">Público</option>
        </select>

        <Link
          href="/projects/new"
          className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Novo projeto
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Código</th>
              <th>Projeto</th>
              <th>Status</th>
              <th>Visibilidade</th>
              <th>Progresso</th>
              <th>Orçamento</th>
              <th>Término</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((project) => (
              <tr key={project.id}>
                <td>{project.code}</td>
                <td>{project.name}</td>
                <td>{humanizeStatus(project.status)}</td>
                <td>{project.visibility === "public" ? "Público" : "Interno"}</td>
                <td>{project.physical_progress}%</td>
                <td>{formatCurrencyBRL(project.planned_budget)}</td>
                <td>{formatDateBR(project.planned_end_date)}</td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      href={`/projects/${project.code}`}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium"
                    >
                      Abrir
                    </Link>
                    <Link
                      href={`/projects/${project.code}/edit`}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium"
                    >
                      Editar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
