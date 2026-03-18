export type ApprovalFormValues = {
  title: string;
  meeting_date: string;
  decision_status: string;
  notes: string;
  approval_type: string;
  approval_status: string;
  comments: string;
};

export const defaultApprovalFormValues: ApprovalFormValues = {
  title: "",
  meeting_date: new Date().toISOString().slice(0, 10),
  decision_status: "pendente",
  notes: "",
  approval_type: "executiva",
  approval_status: "pendente",
  comments: "",
};
