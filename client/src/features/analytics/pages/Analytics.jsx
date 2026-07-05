import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import PageHeader from "../../../shared/components/PageHeader";
import Card from "../../../shared/components/Card";
import Loader from "../../../shared/components/Loader";
import EmptyState from "../../../shared/components/EmptyState";
import StatCard from "../../../shared/components/StatCard";

import ChartCard from "../components/ChartCard";
import ScoreChart from "../components/ScoreChart";
import CompletionChart from "../components/CompletionChart";

import { getAnalytics } from "../services/analyticsService";

import { Trophy, Target, CalendarDays } from "lucide-react";
import SkeletonCard from "@/shared/components/SkeletonCard";




function Analytics() {
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();

      setAnalytics(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (!analytics || analytics.stats.totalDays === 0) {
    return (
      <MainLayout>
        <PageHeader
          title="Analytics"
          subtitle="Understand your progress over time."
        />

        <EmptyState
          title="No Analytics Yet"
          description="Complete a few days of tracking to unlock your analytics."
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        title="Analytics"
        subtitle="See how you're improving over time."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Average Score"
          value={analytics.stats.averageScore}
          icon={<Trophy size={22} />}
        />

        <StatCard
          title="Completion %"
          value={`${analytics.stats.averageCompletion}%`}
          icon={<Target size={22} />}
        />

        <StatCard
          title="Tracked Days"
          value={analytics.stats.totalDays}
          icon={<CalendarDays size={22} />}
        />
      </div>

      <ChartCard title="Daily Score">
        <ScoreChart data={analytics.scoreData} />
      </ChartCard>

      <ChartCard title="Completion Percentage">
        <CompletionChart data={analytics.completionData} />
      </ChartCard>
    </MainLayout>
  );
}

export default Analytics;
