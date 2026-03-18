export type UpdateFormValues = {
  update_date: string;
  title: string;
  summary: string;
  physical_progress: string;
  financial_progress: string;
  published_to_residents: boolean;
};

export const defaultUpdateFormValues: UpdateFormValues = {
  update_date: new Date().toISOString().slice(0, 10),
  title: "",
  summary: "",
  physical_progress: "0",
  financial_progress: "0",
  published_to_residents: false,
};
