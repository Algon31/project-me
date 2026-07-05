import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import PageHeader from "../../../shared/components/PageHeader";

import StatCard from "../../../shared/components/StatCard";

import { Trophy, Flame, Brain, Target } from "lucide-react";

import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const result = await getDashboard();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) {
    return (
      <MainLayout>
        <PageHeader title="Dashboard" />

        <p className="text-[var(--muted)]">Loading your dashboard...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader title="Dashboard" subtitle="Track your overall progress." />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Today's Score"
          value={data.score}
          icon={<Trophy size={22} />}
        />

        <StatCard
          title="Current Streak"
          value={data.streak}
          icon={<Flame size={22} />}
        />

        <StatCard
          title="Problems Solved"
          value={data.problemsSolved}
          icon={<Target size={22} />}
        />

        <StatCard
          title="IQ Score"
          value={data.iqScore}
          icon={<Brain size={22} />}
        />
      </div>
    </MainLayout>
  );
}

export default Dashboard;
