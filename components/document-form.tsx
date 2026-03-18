"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { DocumentFormValues } from "@/types/document-form";

function toNumber(value: string) {
  const n = Number(String(value).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export function DocumentForm({
  projectId,
  projectCode,
  initialValues,
}: {
  projectId: string;
  projectCode: string;
  initialValues: DocumentFormValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState<DocumentFormValues>(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setField<K extends keyof DocumentFormValues>(key: K, value: DocumentFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      project_id: projectId,
      related_entity_type: values.related_entity_type || "project",
      related_entity_id: values.related_entity_id || projectId,
      category: values.category.trim() || "geral",
      title: values.title.trim(),
      file_name: values.file_name.trim(),
      file_path: values.file_path.trim(),
      file_extension: values.file_extension.trim() || null,
      file_size_bytes: toNumber(values.file_size_bytes),
      mime_type: values.mime_type.trim() || null,
      version_no: toNumber(values.version_no),
      is_public: values.is_public,
    };

    try {
      const { error } = await supabase.from("documents").insert(payload);
      if (error) throw error;
      router.push(`/projects/${projectCode}/documents?refresh=${Date.now()}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar documento.");
    } finally {
      setSaving(false)
    }
  }

  const input = "mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none";
  const label = "text-xs font-semibold uppercase tracking-wide text-slate-500";

  return (
    <div className="card p-5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={label}>Categoria</label><input className={input} value={values.category} onChange={(e)=>setField("category", e.target.value)} required /></div>
          <div><label className={label}>Título</label><input className={input} value={values.title} onChange={(e)=>setField("title", e.target.value)} required /></div>
          <div><label className={label}>Nome do arquivo</label><input className={input} value={values.file_name} onChange={(e)=>setField("file_name", e.target.value)} required /></div>
          <div><label className={label}>Caminho / Storage path</label><input className={input} value={values.file_path} onChange={(e)=>setField("file_path", e.target.value)} required /></div>
          <div><label className={label}>Extensão</label><input className={input} value={values.file_extension} onChange={(e)=>setField("file_extension", e.target.value)} placeholder="pdf, xlsx, docx..." /></div>
          <div><label className={label}>Mime type</label><input className={input} value={values.mime_type} onChange={(e)=>setField("mime_type", e.target.value)} placeholder="application/pdf" /></div>
          <div><label className={label}>Tamanho (bytes)</label><input type="number" className={input} value={values.file_size_bytes} onChange={(e)=>setField("file_size_bytes", e.target.value)} /></div>
          <div><label className={label}>Versão</label><input type="number" className={input} value={values.version_no} onChange={(e)=>setField("version_no", e.target.value)} /></div>
          <div><label className={label}>Tipo relacionado</label><input className={input} value={values.related_entity_type} onChange={(e)=>setField("related_entity_type", e.target.value)} /></div>
          <div><label className={label}>ID relacionado</label><input className={input} value={values.related_entity_id} onChange={(e)=>setField("related_entity_id", e.target.value)} placeholder={projectId} /></div>
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm">
          <input type="checkbox" checked={values.is_public} onChange={(e)=>setField("is_public", e.target.checked)} />
          Disponibilizar este documento no portal do morador
        </label>

        {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={saving} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50">
            {saving ? "Salvando..." : "Salvar documento"}
          </button>
          <button type="button" onClick={() => history.back()} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium">
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}
