import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import StatCard from "../../../shared/components/StatCard";
import ProgressBar from "../../../shared/components/ProgressBar";
import Loader from "../../../shared/components/Loader";

import { Trophy, Flame, Brain, Target } from "lucide-react";

import WelcomeCard from "../components/WelcomeCard";
import QuickActions from "../components/QuickActions";

import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const result = await getDashboard();

      setData(result);
    } catch (err) {
      console.error(err);
    }
  }

  if (!data) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <Loader />
          <Loader />
          <Loader />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <WelcomeCard />

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Today's Progress</h2>

        <ProgressBar value={data.completionPercentage || 0} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-10">
        <StatCard
          title="Today's Score"
          value={data.score}
          icon={<Trophy size={22} />}
        />

        <StatCard
          title="Current Streak"
          value={`${data.streak} Day${data.streak !== 1 ? "s" : ""}`}
          icon={<Flame size={22} />}
        />

        <StatCard
          title="Weekly Average"
          value={`${data.weeklyAverage}%`}
          icon={<Target size={22} />}
        />

        <StatCard
          title="Tracked Days"
          value={data.trackedDays}
          icon={<Brain size={22} />}
        />
      </div>

      <QuickActions />
    </MainLayout>
  );
}

export default Dashboard;
