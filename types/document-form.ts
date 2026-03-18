export type DocumentFormValues = {
  category: string;
  title: string;
  file_name: string;
  file_path: string;
  file_extension: string;
  file_size_bytes: string;
  mime_type: string;
  version_no: string;
  is_public: boolean;
  related_entity_type: string;
  related_entity_id: string;
};

export const defaultDocumentFormValues: DocumentFormValues = {
  category: "geral",
  title: "",
  file_name: "",
  file_path: "",
  file_extension: "",
  file_size_bytes: "0",
  mime_type: "",
  version_no: "1",
  is_public: false,
  related_entity_type: "project",
  related_entity_id: "",
};
