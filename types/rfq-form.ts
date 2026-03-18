export type RfqFormValues = {
  title: string;
  description: string;
  issue_date: string;
  due_date: string;
  status: string;
};

export const defaultRfqFormValues: RfqFormValues = {
  title: "",
  description: "",
  issue_date: new Date().toISOString().slice(0, 10),
  due_date: "",
  status: "emitida",
};
