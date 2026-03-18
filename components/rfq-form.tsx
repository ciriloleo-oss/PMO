"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { RfqFormValues } from "@/types/rfq-form";

export function RfqForm({
  projectId,
  projectCode,
  initialValues,
}: {
  projectId: string;
  projectCode: string;
  initialValues: RfqFormValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setField<K extends keyof RfqFormValues>(
    key: K,
    value: RfqFormValues[K]
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const table = supabase.from("rfqs") as any;

      const payload: any = {
        project_id: projectId,
        title: values.title.trim(),
        description: values.description.trim() || null,
        issue_date: values.issue_date || null,
        due_date: values.due_date || null,
        status: values.status,
      };

      const { error } = await table.insert(payload);
      if (error) throw error;

      router.push(`/projects/${projectCode}/rfq?refresh=${Date.now()}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar RFQ.");
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
          <div className="md:col-span-2">
            <label className={label}>Título</label>
            <input
              className={input}
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={label}>Data de emissão</label>
            <input
              type="date"
              className={input}
              value={values.issue_date}
              onChange={(e) => setField("issue_date", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Prazo</label>
            <input
              type="date"
              className={input}
              value={values.due_date}
              onChange={(e) => setField("due_date", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Status</label>
            <select
              className={input}
              value={values.status}
              onChange={(e) => setField("status", e.target.value)}
            >
              <option value="emitida">Emitida</option>
              <option value="em_resposta">Em resposta</option>
              <option value="em_analise">Em análise</option>
              <option value="encerrada">Encerrada</option>
            </select>
          </div>
        </div>

        <div>
          <label className={label}>Descrição</label>
          <textarea
            className={input + " min-h-28"}
            value={values.description}
            onChange={(e) => setField("description", e.target.value)}
          />
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar RFQ"}
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