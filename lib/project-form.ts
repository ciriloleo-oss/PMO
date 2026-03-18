import type { Database } from "@/types/database";
import type { ProjectFormValues } from "@/types/project-form";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

function numToString(value: number | null | undefined) {
  return String(value ?? 0);
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
    priority: project.priority,
    status: project.status,
    visibility: project.visibility,
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
