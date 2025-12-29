interface RecentActivitiesProps {
  data: any[];
}

export default function RecentActivities({
  data,
}: RecentActivitiesProps) {
  if (!data.length) {
    return (
      <p className="text-sm text-slate-400">
        Nenhuma atividade encontrada
      </p>
    );
  }

  return (
    <ul className="divide-y">
      {data.map(activity => (
        <li key={activity.id} className="py-3">
          <p className="text-slate-700 font-medium">
            Abrigo #{activity.work_id}
          </p>

          <p className="text-xs text-slate-400">
            {activity.title}
          </p>
        </li>
      ))}
    </ul>
  );
}
