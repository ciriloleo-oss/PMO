import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ProjectForm } from "@/components/project-form";
import { defaultProjectFormValues } from "@/types/project-form";

export default function NewProjectPage() {
  return (
    <AppShell>
      <div className="page-shell space-y-6">
        <PageHeader eyebrow="CRUD de projetos" title="Novo projeto" description="Primeira tela funcional de cadastro direto no banco." />
        <ProjectForm mode="create" initialValues={defaultProjectFormValues} />
      </div>
    </AppShell>
  );
}
