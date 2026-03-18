"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { UpdateFormValues } from "@/types/update-form";

function toNumber(value: string) {
  const n = Number(String(value).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export function UpdateForm({
  projectId,
  projectCode,
  initialValues,
}: {
  projectId: string;
  projectCode: string;
  initialValues: UpdateFormValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState<UpdateFormValues>(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setField<K extends keyof UpdateFormValues>(
    key: K,
    value: UpdateFormValues[K]
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: any = {
      project_id: projectId,
      update_date: values.update_date,
      title: values.title.trim(),
      summary: values.summary.trim() || null,
      physical_progress: toNumber(values.physical_progress),
      financial_progress: toNumber(values.financial_progress),
      published_to_residents: values.published_to_residents,
    };

    try {
      const table = supabase.from("project_updates") as any;
      const { error } = await table.insert(payload);
      if (error) throw error;

      router.push(`/projects/${projectCode}?refresh=${Date.now()}`);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao salvar atualização."
      );
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
            <label className={label}>Data da atualização</label>
            <input
              type="date"
              className={input}
              value={values.update_date}
              onChange={(e) => setField("update_date", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={label}>Título</label>
            <input
              className={input}
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={label}>Progresso físico (%)</label>
            <input
              type="number"
              step="0.01"
              className={input}
              value={values.physical_progress}
              onChange={(e) => setField("physical_progress", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Progresso financeiro (%)</label>
            <input
              type="number"
              step="0.01"
              className={input}
              value={values.financial_progress}
              onChange={(e) => setField("financial_progress", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={label}>Resumo</label>
          <textarea
            className={input + " min-h-28"}
            value={values.summary}
            onChange={(e) => setField("summary", e.target.value)}
            placeholder="Descreva o que foi realizado, próximos passos, riscos e observações."
          />
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm">
          <input
            type="checkbox"
            checked={values.published_to_residents}
            onChange={(e) =>
              setField("published_to_residents", e.target.checked)
            }
          />
          Publicar esta atualização no portal do morador
        </label>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar atualização"}
          </button>

          <button
            type="button"
            onClick={() => history.back()}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}