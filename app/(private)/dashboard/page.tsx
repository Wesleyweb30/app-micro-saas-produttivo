import DashboardFilters from '@/components/dashboard/DashboardFilters';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import KpiCard from '@/components/KpiCard';
import RecentActivities from '@/components/RecentActivities';

import { listFormFills } from '@/modules/produttivo/services/produttivo/form_fills.service';

export default async function DashboardPage() {
  const dataFormFills = await listFormFills({
    accountId: 166569,
    formIds: [356263],
    userIds: [319201, 310344],
    orderType: 'desc',
    rangeTime: "01/06/2025 - 31/12/2025",
  });

  const formFills = dataFormFills.results || [];

  // ==========================
  // KPIs
  // ==========================
  const totalServicos = dataFormFills.meta.count;

  const hoje = new Date().toISOString().slice(0, 10);

  const servicosHoje = formFills.filter((f: any) =>
    f.created_at?.startsWith(hoje)
  ).length;

  const abrigosUnicos = new Set(
    formFills.map((f: any) => f.work_id)
  ).size;

  // ==========================
  // Últimas atividades
  // ==========================
  const recentActivities = formFills.slice(0, 5);

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <h1 className="text-slate-500">
        Visão geral dos serviços de manutenção
      </h1>

      <DashboardFilters />

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard
          title="Abrigos Atendidos"
          value={abrigosUnicos}
        />

        <KpiCard
          title="Serviços Hoje"
          value={servicosHoje}
        />

        <KpiCard
          title="Total de Serviços"
          value={totalServicos}
        />

        <KpiCard
          title="Equipe Ativa"
          value="-"
        />
      </section>

      {/* Conteúdo */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-slate-700 mb-4">
            Atividades Recentes
          </h2>

          <RecentActivities data={recentActivities} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-slate-700 mb-4">
            Status Geral
          </h2>

          <div className="h-48 flex items-center justify-center text-slate-400">
            (Gráfico em breve)
          </div>
        </div>
      </section>
    </div>
  );
}
