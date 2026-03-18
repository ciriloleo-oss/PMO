export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      approvals: {
        Row: {
          approval_date: string | null
          approval_status: string
          approval_type: string
          approved_by: string | null
          assembly_id: string | null
          comments: string | null
          created_at: string
          id: string
          project_id: string
          updated_at: string
        }
        Insert: {
          approval_date?: string | null
          approval_status?: string
          approval_type: string
          approved_by?: string | null
          assembly_id?: string | null
          comments?: string | null
          created_at?: string
          id?: string
          project_id: string
          updated_at?: string
        }
        Update: {
          approval_date?: string | null
          approval_status?: string
          approval_type?: string
          approved_by?: string | null
          assembly_id?: string | null
          comments?: string | null
          created_at?: string
          id?: string
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_approvals_approved_by"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_approvals_assembly"
            columns: ["assembly_id"]
            isOneToOne: false
            referencedRelation: "assemblies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_approvals_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      assemblies: {
        Row: {
          created_at: string
          decision_status: string
          id: string
          meeting_date: string
          notes: string | null
          project_id: string
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          decision_status?: string
          id?: string
          meeting_date: string
          notes?: string | null
          project_id: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          decision_status?: string
          id?: string
          meeting_date?: string
          notes?: string | null
          project_id?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_assemblies_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          new_data: Json | null
          old_data: Json | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_audit_logs_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string
          created_at: string
          file_extension: string | null
          file_name: string
          file_path: string
          file_size_bytes: number | null
          id: string
          is_public: boolean
          mime_type: string | null
          project_id: string
          related_entity_id: string | null
          related_entity_type: string | null
          title: string
          updated_at: string
          uploaded_by: string | null
          version_no: number
        }
        Insert: {
          category: string
          created_at?: string
          file_extension?: string | null
          file_name: string
          file_path: string
          file_size_bytes?: number | null
          id?: string
          is_public?: boolean
          mime_type?: string | null
          project_id: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          title: string
          updated_at?: string
          uploaded_by?: string | null
          version_no?: number
        }
        Update: {
          category?: string
          created_at?: string
          file_extension?: string | null
          file_name?: string
          file_path?: string
          file_size_bytes?: number | null
          id?: string
          is_public?: boolean
          mime_type?: string | null
          project_id?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          title?: string
          updated_at?: string
          uploaded_by?: string | null
          version_no?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_documents_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_documents_uploaded_by"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          caption: string | null
          created_at: string
          file_path: string
          id: string
          is_public: boolean
          progress_update_id: string | null
          project_id: string
          taken_at: string | null
          title: string | null
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string
          file_path: string
          id?: string
          is_public?: boolean
          progress_update_id?: string | null
          project_id: string
          taken_at?: string | null
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string
          file_path?: string
          id?: string
          is_public?: boolean
          progress_update_id?: string | null
          project_id?: string
          taken_at?: string | null
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_photos_progress_update"
            columns: ["progress_update_id"]
            isOneToOne: false
            referencedRelation: "project_updates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_photos_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_photos_uploaded_by"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_phases: {
        Row: {
          actual_end_date: string | null
          actual_start_date: string | null
          completion_percent: number
          created_at: string
          id: string
          notes: string | null
          phase_name: string
          phase_order: number
          planned_end_date: string | null
          planned_start_date: string | null
          project_id: string
          status: string
          updated_at: string
        }
        Insert: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          completion_percent?: number
          created_at?: string
          id?: string
          notes?: string | null
          phase_name: string
          phase_order: number
          planned_end_date?: string | null
          planned_start_date?: string | null
          project_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          completion_percent?: number
          created_at?: string
          id?: string
          notes?: string | null
          phase_name?: string
          phase_order?: number
          planned_end_date?: string | null
          planned_start_date?: string | null
          project_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_project_phases_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_risks: {
        Row: {
          created_at: string
          description: string | null
          id: string
          impact: string
          mitigation_plan: string | null
          owner_user_id: string | null
          probability: string
          project_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          impact?: string
          mitigation_plan?: string | null
          owner_user_id?: string | null
          probability?: string
          project_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          impact?: string
          mitigation_plan?: string | null
          owner_user_id?: string | null
          probability?: string
          project_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_project_risks_owner"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_project_risks_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tags_link: {
        Row: {
          created_at: string
          id: string
          project_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          tag_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_project_tags_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_project_tags_tag"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      project_updates: {
        Row: {
          created_at: string
          created_by: string | null
          detailed_report: string | null
          financial_progress: number
          id: string
          impediments: string | null
          next_steps: string | null
          physical_progress: number
          project_id: string
          published_to_residents: boolean
          risks: string | null
          summary: string | null
          title: string
          update_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          detailed_report?: string | null
          financial_progress?: number
          id?: string
          impediments?: string | null
          next_steps?: string | null
          physical_progress?: number
          project_id: string
          published_to_residents?: boolean
          risks?: string | null
          summary?: string | null
          title: string
          update_date: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          detailed_report?: string | null
          financial_progress?: number
          id?: string
          impediments?: string | null
          next_steps?: string | null
          physical_progress?: number
          project_id?: string
          published_to_residents?: boolean
          risks?: string | null
          summary?: string | null
          title?: string
          update_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_project_updates_created_by"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_project_updates_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          actual_cost: number
          actual_end_date: string | null
          actual_start_date: string | null
          approved_budget: number
          code: string
          contracted_budget: number
          created_at: string
          created_by: string | null
          description: string | null
          financial_progress: number
          id: string
          justification: string | null
          manager_id: string | null
          name: string
          objective: string | null
          physical_progress: number
          planned_budget: number
          planned_end_date: string | null
          planned_start_date: string | null
          priority: string
          project_type: string | null
          public_summary: string | null
          sponsor_name: string | null
          status: string
          updated_at: string
          visibility: string
        }
        Insert: {
          actual_cost?: number
          actual_end_date?: string | null
          actual_start_date?: string | null
          approved_budget?: number
          code: string
          contracted_budget?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          financial_progress?: number
          id?: string
          justification?: string | null
          manager_id?: string | null
          name: string
          objective?: string | null
          physical_progress?: number
          planned_budget?: number
          planned_end_date?: string | null
          planned_start_date?: string | null
          priority?: string
          project_type?: string | null
          public_summary?: string | null
          sponsor_name?: string | null
          status?: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          actual_cost?: number
          actual_end_date?: string | null
          actual_start_date?: string | null
          approved_budget?: number
          code?: string
          contracted_budget?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          financial_progress?: number
          id?: string
          justification?: string | null
          manager_id?: string | null
          name?: string
          objective?: string | null
          physical_progress?: number
          planned_budget?: number
          planned_end_date?: string | null
          planned_start_date?: string | null
          priority?: string
          project_type?: string | null
          public_summary?: string | null
          sponsor_name?: string | null
          status?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_projects_created_by"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_projects_manager"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          amount: number
          commercial_score: number | null
          created_at: string
          delivery_time_days: number | null
          id: string
          notes: string | null
          rfq_id: string
          status: string
          submitted_at: string | null
          technical_score: number | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          amount?: number
          commercial_score?: number | null
          created_at?: string
          delivery_time_days?: number | null
          id?: string
          notes?: string | null
          rfq_id: string
          status?: string
          submitted_at?: string | null
          technical_score?: number | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          amount?: number
          commercial_score?: number | null
          created_at?: string
          delivery_time_days?: number | null
          id?: string
          notes?: string | null
          rfq_id?: string
          status?: string
          submitted_at?: string | null
          technical_score?: number | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_quotes_rfq"
            columns: ["rfq_id"]
            isOneToOne: false
            referencedRelation: "rfqs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_quotes_vendor"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      rfq_vendors: {
        Row: {
          id: string
          invited_at: string | null
          notes: string | null
          response_status: string
          rfq_id: string
          vendor_id: string
        }
        Insert: {
          id?: string
          invited_at?: string | null
          notes?: string | null
          response_status?: string
          rfq_id: string
          vendor_id: string
        }
        Update: {
          id?: string
          invited_at?: string | null
          notes?: string | null
          response_status?: string
          rfq_id?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_rfq_vendors_rfq"
            columns: ["rfq_id"]
            isOneToOne: false
            referencedRelation: "rfqs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_rfq_vendors_vendor"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      rfqs: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          issue_date: string | null
          project_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          issue_date?: string | null
          project_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          issue_date?: string | null
          project_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_rfqs_created_by"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_rfqs_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      task_dependencies: {
        Row: {
          created_at: string
          dependency_type: string
          id: string
          lag_days: number
          predecessor_task_id: string
          successor_task_id: string
        }
        Insert: {
          created_at?: string
          dependency_type?: string
          id?: string
          lag_days?: number
          predecessor_task_id: string
          successor_task_id: string
        }
        Update: {
          created_at?: string
          dependency_type?: string
          id?: string
          lag_days?: number
          predecessor_task_id?: string
          successor_task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_task_dep_predecessor"
            columns: ["predecessor_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_task_dep_successor"
            columns: ["successor_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          actual_end_date: string | null
          actual_start_date: string | null
          created_at: string
          description: string | null
          duration_days: number | null
          id: string
          is_milestone: boolean
          name: string
          parent_task_id: string | null
          phase_id: string | null
          planned_end_date: string | null
          planned_start_date: string | null
          progress_percent: number
          project_id: string
          responsible_user_id: string | null
          sort_order: number
          status: string
          updated_at: string
        }
        Insert: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          created_at?: string
          description?: string | null
          duration_days?: number | null
          id?: string
          is_milestone?: boolean
          name: string
          parent_task_id?: string | null
          phase_id?: string | null
          planned_end_date?: string | null
          planned_start_date?: string | null
          progress_percent?: number
          project_id: string
          responsible_user_id?: string | null
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Update: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          created_at?: string
          description?: string | null
          duration_days?: number | null
          id?: string
          is_milestone?: boolean
          name?: string
          parent_task_id?: string | null
          phase_id?: string | null
          planned_end_date?: string | null
          planned_start_date?: string | null
          progress_percent?: number
          project_id?: string
          responsible_user_id?: string | null
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_tasks_parent"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_tasks_phase"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_tasks_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_tasks_responsible"
            columns: ["responsible_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      update_publications: {
        Row: {
          channel: string
          id: string
          notes: string | null
          project_update_id: string
          published_at: string
          published_by: string | null
        }
        Insert: {
          channel?: string
          id: string
          notes?: string | null
          project_update_id: string
          published_at?: string
          published_by?: string | null
        }
        Update: {
          channel?: string
          id?: string
          notes?: string | null
          project_update_id?: string
          published_at?: string
          published_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "update_publications_project_update_id_fkey"
            columns: ["project_update_id"]
            isOneToOne: false
            referencedRelation: "project_updates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "update_publications_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          active: boolean
          auth_user_id: string | null
          created_at: string
          email: string
          id: string
          name: string
          role_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          auth_user_id?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          role_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          auth_user_id?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          role_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_users_role"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          active: boolean
          category: string | null
          company_name: string
          contact_name: string | null
          created_at: string
          email: string | null
          id: string
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          category?: string | null
          company_name: string
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          category?: string | null
          company_name?: string
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
