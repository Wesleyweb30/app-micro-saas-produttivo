'use client';

export default function DashboardFilters() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-4">
      <input
        type="date"
        className="border rounded-md px-3 py-2 text-sm"
      />

      <input
        type="date"
        className="border rounded-md px-3 py-2 text-sm"
      />

      <select className="border rounded-md px-3 py-2 text-sm">
        <option>Abrigo</option>
      </select>

      <select className="border rounded-md px-3 py-2 text-sm">
        <option>Executor</option>
      </select>
    </div>
  );
}
