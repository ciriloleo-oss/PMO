"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { ProjectFormValues } from "@/types/project-form";

function toNumber(value: string) {
  const n = Number(String(value).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export function ProjectForm({
  mode,
  initialValues,
  projectId,
}: {
  mode: "create" | "edit";
  initialValues: ProjectFormValues;
  projectId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProjectFormValues>(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setField<K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K]
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: any = {
      code: values.code.trim(),
      name: values.name.trim(),
      description: values.description?.trim() || null,
      objective: values.objective?.trim() || null,
      justification: values.justification?.trim() || null,
      sponsor_name: values.sponsor_name?.trim() || null,
      project_type: values.project_type?.trim() || null,
      priority: values.priority,
      status: values.status,
      visibility: values.visibility,
      planned_start_date: values.planned_start_date || null,
      planned_end_date: values.planned_end_date || null,
      planned_budget: toNumber(values.planned_budget),
      approved_budget: toNumber(values.approved_budget),
      contracted_budget: toNumber(values.contracted_budget),
      actual_cost: toNumber(values.actual_cost),
      physical_progress: toNumber(values.physical_progress),
      financial_progress: toNumber(values.financial_progress),
      public_summary: values.public_summary?.trim() || null,
    };

    try {
      const table = supabase.from("projects") as any;

      if (mode === "create") {
        const { data, error } = await table.insert(payload).select();

        console.log("INSERT RESULT", { data, error, payload });

        if (error) throw error;
      } else {
        const { data, error } = await table
          .update(payload)
          .eq("id", projectId)
          .select();

        console.log("UPDATE RESULT", { data, error, payload });

        if (error) throw error;
      }

      router.push(`/projects?refresh=${Date.now()}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  const input =
    "mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none";
  const label = "text-xs font-semibold uppercase tracking-wide text-slate-500";

  return (
    <div className="card p-5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={label}>Código</label>
            <input
              className={input}
              value={values.code}
              onChange={(e) => setField("code", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={label}>Nome</label>
            <input
              className={input}
              value={values.name}
              onChange={(e) => setField("name", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={label}>Tipo</label>
            <input
              className={input}
              value={values.project_type}
              onChange={(e) => setField("project_type", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Patrocinador</label>
            <input
              className={input}
              value={values.sponsor_name}
              onChange={(e) => setField("sponsor_name", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Prioridade</label>
            <select
              className={input}
              value={values.priority}
              onChange={(e) =>
                setField("priority", e.target.value as ProjectFormValues["priority"])
              }
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
              <option value="critica">Crítica</option>
            </select>
          </div>

          <div>
            <label className={label}>Status</label>
            <select
              className={input}
              value={values.status}
              onChange={(e) =>
                setField("status", e.target.value as ProjectFormValues["status"])
              }
            >
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
          </div>

          <div>
            <label className={label}>Visibilidade</label>
            <select
              className={input}
              value={values.visibility}
              onChange={(e) =>
                setField("visibility", e.target.value as ProjectFormValues["visibility"])
              }
            >
              <option value="internal">Interno</option>
              <option value="public">Público</option>
            </select>
          </div>

          <div>
            <label className={label}>Início planejado</label>
            <input
              type="date"
              className={input}
              value={values.planned_start_date}
              onChange={(e) => setField("planned_start_date", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Fim planejado</label>
            <input
              type="date"
              className={input}
              value={values.planned_end_date}
              onChange={(e) => setField("planned_end_date", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Orçamento planejado</label>
            <input
              type="number"
              className={input}
              value={values.planned_budget}
              onChange={(e) => setField("planned_budget", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Custo realizado</label>
            <input
              type="number"
              className={input}
              value={values.actual_cost}
              onChange={(e) => setField("actual_cost", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Progresso físico (%)</label>
            <input
              type="number"
              className={input}
              value={values.physical_progress}
              onChange={(e) => setField("physical_progress", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={label}>Descrição</label>
          <textarea
            className={input + " min-h-24"}
            value={values.description}
            onChange={(e) => setField("description", e.target.value)}
          />
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}