export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          code: string;
          name: string;
          description: string | null;
          objective: string | null;
          justification: string | null;
          sponsor_name: string | null;
          manager_id: string | null;
          project_type: string | null;
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
          planned_start_date: string | null;
          planned_end_date: string | null;
          actual_start_date: string | null;
          actual_end_date: string | null;
          planned_budget: number;
          approved_budget: number;
          contracted_budget: number;
          actual_cost: number;
          physical_progress: number;
          financial_progress: number;
          public_summary: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      project_updates: {
        Row: {
          id: string;
          project_id: string;
          update_date: string;
          title: string;
          summary: string | null;
          physical_progress: number;
          financial_progress: number;
          published_to_residents: boolean;
          created_at: string;
        };
      };
      documents: {
        Row: {
          id: string;
          project_id: string;
          related_entity_type: string | null;
          related_entity_id: string | null;
          category: string;
          title: string;
          file_name: string;
          file_path: string;
          file_extension: string | null;
          file_size_bytes: number | null;
          mime_type: string | null;
          version_no: number;
          uploaded_by: string | null;
          is_public: boolean;
          created_at: string;
        };
      };
      rfqs: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          description: string | null;
          issue_date: string | null;
          due_date: string | null;
          status: string;
          created_by: string | null;
          created_at: string;
        };
      };
      quotes: {
        Row: {
          id: string;
          rfq_id: string;
          vendor_id: string;
          amount: number;
          delivery_time_days: number | null;
          technical_score: number | null;
          commercial_score: number | null;
          status: string;
          submitted_at: string | null;
          notes: string | null;
          created_at: string;
        };
      };
      vendors: {
        Row: {
          id: string;
          company_name: string;
          contact_name: string | null;
          email: string | null;
          phone: string | null;
          category: string | null;
          notes: string | null;
          active: boolean;
          created_at: string;
        };
      };
      assemblies: {
        Row: {
          id: string;
          project_id: string;
          meeting_date: string;
          title: string;
          decision_status: string;
          notes: string | null;
          created_at: string;
        };
      };
      approvals: {
        Row: {
          id: string;
          project_id: string;
          assembly_id: string | null;
          approval_type: string;
          approved_by: string | null;
          approval_status: string;
          approval_date: string | null;
          comments: string | null;
          created_at: string;
        };
      };
    };
  };
}
