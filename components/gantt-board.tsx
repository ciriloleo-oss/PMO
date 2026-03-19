export function GanttBoard({ projects }: { projects: any[] }) {
  return (
    <div className="card p-5">
      <h2 className="text-lg font-semibold">Gantt</h2>
      <div className="mt-4 space-y-2">
        {projects.map((p) => (
          <div key={p.id} className="p-2 border rounded">
            {p.code} - {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}
