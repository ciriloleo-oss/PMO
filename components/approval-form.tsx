"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { ApprovalFormValues } from "@/types/approval-form";

export function ApprovalForm({
  projectId,
  projectCode,
  initialValues,
}: {
  projectId: string;
  projectCode: string;
  initialValues: ApprovalFormValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setField<K extends keyof ApprovalFormValues>(
    key: K,
    value: ApprovalFormValues[K]
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const assemblyPayload: any = {
        project_id: projectId,
        meeting_date: values.meeting_date,
        title: values.title.trim(),
        decision_status: values.decision_status,
        notes: values.notes.trim() || null,
      };

const { data: assemblyData, error: assemblyError } = await supabase
  .from("assemblies")
  .insert(assemblyPayload)
  .select("id")
  .single();

if (assemblyError) throw assemblyError;
if (!assemblyData) throw new Error("Assembleia não retornou ID.");

const assembly = assemblyData as { id: string };

const approvalPayload: any = {
  project_id: projectId,
  assembly_id: assembly.id,
        approval_type: values.approval_type,
        approval_status: values.approval_status,
        comments: values.comments.trim() || null,
      };

      const { error: approvalError } = await supabase
        .from("approvals")
        .insert(approvalPayload);

      if (approvalError) throw approvalError;

      router.push(`/projects/${projectCode}/approvals?refresh=${Date.now()}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar aprovação.");
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
            <label className={label}>Título da assembleia / pauta</label>
            <input
              className={input}
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={label}>Data</label>
            <input
              type="date"
              className={input}
              value={values.meeting_date}
              onChange={(e) => setField("meeting_date", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Decisão da assembleia</label>
            <select
              className={input}
              value={values.decision_status}
              onChange={(e) => setField("decision_status", e.target.value)}
            >
              <option value="pendente">Pendente</option>
              <option value="aprovado">Aprovado</option>
              <option value="reprovado">Reprovado</option>
              <option value="adiado">Adiado</option>
            </select>
          </div>

          <div>
            <label className={label}>Tipo de aprovação</label>
            <select
              className={input}
              value={values.approval_type}
              onChange={(e) => setField("approval_type", e.target.value)}
            >
              <option value="tecnica">Técnica</option>
              <option value="financeira">Financeira</option>
              <option value="executiva">Executiva</option>
            </select>
          </div>

          <div>
            <label className={label}>Status da aprovação</label>
            <select
              className={input}
              value={values.approval_status}
              onChange={(e) => setField("approval_status", e.target.value)}
            >
              <option value="pendente">Pendente</option>
              <option value="aprovado">Aprovado</option>
              <option value="reprovado">Reprovado</option>
            </select>
          </div>
        </div>

        <div>
          <label className={label}>Notas da assembleia</label>
          <textarea
            className={input + " min-h-24"}
            value={values.notes}
            onChange={(e) => setField("notes", e.target.value)}
          />
        </div>

        <div>
          <label className={label}>Comentários da aprovação</label>
          <textarea
            className={input + " min-h-24"}
            value={values.comments}
            onChange={(e) => setField("comments", e.target.value)}
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
            {saving ? "Salvando..." : "Salvar aprovação"}
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