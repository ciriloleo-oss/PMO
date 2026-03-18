import Image from "next/image";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="page-header">
      <div className="page-header-inner">
        <div>
          <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
            {eyebrow}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">{description}</p>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <Image
              src="/fef.png"
              alt="F&F Serviços"
              width={120}
              height={120}
              className="h-16 w-auto"
              priority
            />
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
