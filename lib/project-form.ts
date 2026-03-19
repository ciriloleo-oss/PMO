import type { Database } from "@/types/database";
import type { ProjectFormValues } from "@/types/project-form";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

function numToString(value: number | null | undefined) {
  return String(value ?? 0);
}

function normalizePriority(
  value: string | null | undefined
): ProjectFormValues["priority"] {
  if (value === "baixa" || value === "media" || value === "alta" || value === "critica") {
    return value;
  }
  return "media";
}

function normalizeStatus(
  value: string | null | undefined
): ProjectFormValues["status"] {
  if (
    value === "em_definicao" ||
    value === "em_rfq" ||
    value === "em_orcamento" ||
    value === "em_aprovacao" ||
    value === "aprovado" ||
    value === "em_execucao" ||
    value === "suspenso" ||
    value === "concluido" ||
    value === "cancelado"
  ) {
    return value;
  }
  return "em_definicao";
}

function normalizeVisibility(
  value: string | null | undefined
): ProjectFormValues["visibility"] {
  if (value === "internal" || value === "public") {
    return value;
  }
  return "internal";
}

export function projectRowToFormValues(project: ProjectRow): ProjectFormValues {
  return {
    code: project.code ?? "",
    name: project.name ?? "",
    description: project.description ?? "",
    objective: project.objective ?? "",
    justification: project.justification ?? "",
    sponsor_name: project.sponsor_name ?? "",
    project_type: project.project_type ?? "",
    priority: normalizePriority(project.priority),
    status: normalizeStatus(project.status),
    visibility: normalizeVisibility(project.visibility),
    planned_start_date: project.planned_start_date ?? "",
    planned_end_date: project.planned_end_date ?? "",
    planned_budget: numToString(project.planned_budget),
    approved_budget: numToString(project.approved_budget),
    contracted_budget: numToString(project.contracted_budget),
    actual_cost: numToString(project.actual_cost),
    physical_progress: numToString(project.physical_progress),
    financial_progress: numToString(project.financial_progress),
    public_summary: project.public_summary ?? "",
  };
}