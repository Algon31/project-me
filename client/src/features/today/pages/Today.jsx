  import { useEffect, useState } from "react";
  import { getMetrics } from "../services/metricService";
  import { getToday, saveToday } from "../services/todayService";
  import MainLayout from "../../../components/layout/MainLayout";
  import MetricRenderer from "../components/MetricRenderer";
  import PageHeader from "../../../shared/components/PageHeader";
  import Button from "@/shared/components/Button";
  import { showSuccess, showError } from "../../../lib/toast";

  function Today() {
    const [metrics, setMetrics] = useState([]);
    const [saving, setSaving] = useState(false);
    useEffect(() => {
      loadPage();
    }, []);
    const loadPage = async () => {
      try {
        const metricsData = await getMetrics();

        const todayData = await getToday();

        const merged = metricsData.map((metric) => {
          const saved = todayData.values.find(
            (item) => item.metric._id === metric._id,
          );

          return {
            ...metric,
            value: saved
              ? saved.value
              : metric.type === "checkbox"
                ? false
                : metric.type === "number"
                  ? 0
                  : "",
          };
        });

        setMetrics(merged);
      } catch (error) {
        console.error(error);
      }
    };

    const updateMetric = (id, value) => {
      setMetrics((prev) =>
        prev.map((metric) => (metric._id === id ? { ...metric, value } : metric)),
      );
    };

    const handleSave = async () => {
      try {
        setSaving(true);

        await saveToday(
          metrics.map((metric) => ({
            metric: metric._id,
            value: metric.value,
          })),
        );

        await loadPage();

        showSuccess("Today's progress saved!");
      } catch (error) {
        showError("Unable to save today's progress.");
        console.error(error);
      } finally {
        setSaving(false);
      }
    };

    return (
      <MainLayout>
        <PageHeader
          title="Today's Progress"
          subtitle="Small improvements every day become big changes."
        />

        <div className="space-y-6 bg">
          {metrics.map((metric) => (
            <MetricRenderer
              key={metric._id}
              metric={metric}
              onChange={(value) => updateMetric(metric._id, value)}
            />
          ))}

          <Button
            onClick={handleSave}
            disabled={saving}
            className="mt-8 max-w-md"
          >
            {saving ? "Saving..." : "Save Today's Progress"}
          </Button>
        </div>
      </MainLayout>
    );
  }

  export default Today;
