export type ProjectFormValues = {
  code: string;
  name: string;
  description: string;
  objective: string;
  justification: string;
  sponsor_name: string;
  project_type: string;
  priority: "baixa" | "media" | "alta" | "critica";
  status:
    | "em_definicao"
    | "em_rfq"
    | "em_orcamento"
    | "em_aprovacao"
    | "aprovado"
    | "em_execucao"
    | "suspenso"
    | "concluido"
    | "cancelado";
  visibility: "internal" | "public";
  planned_start_date: string;
  planned_end_date: string;
  planned_budget: string;
  approved_budget: string;
  contracted_budget: string;
  actual_cost: string;
  physical_progress: string;
  financial_progress: string;
  public_summary: string;
};

export const defaultProjectFormValues: ProjectFormValues = {
  code: "",
  name: "",
  description: "",
  objective: "",
  justification: "",
  sponsor_name: "",
  project_type: "",
  priority: "media",
  status: "em_definicao",
  visibility: "internal",
  planned_start_date: "",
  planned_end_date: "",
  planned_budget: "0",
  approved_budget: "0",
  contracted_budget: "0",
  actual_cost: "0",
  physical_progress: "0",
  financial_progress: "0",
  public_summary: "",
};
