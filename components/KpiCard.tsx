interface KpiCardProps {
  title: string;
  value: number | string;
  variant?: 'default' | 'danger';
}

export default function KpiCard({
  title,
  value,
  variant = 'default',
}: KpiCardProps) {
  const color =
    variant === 'danger'
      ? 'text-red-600'
      : 'text-slate-900';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-sm text-slate-500">
        {title}
      </p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  );
}
