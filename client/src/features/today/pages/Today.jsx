import { useEffect, useState } from "react";
import { getMetrics } from "../services/metricService";
import { getToday, saveToday } from "../services/todayService";
import MainLayout from "../../../components/layout/MainLayout";
import MetricRenderer from "../components/MetricRenderer";

function Today() {
  const [metrics, setMetrics] = useState([]);
  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await getMetrics();

        const today = await getToday();

        const formatted = data.map((metric) => {
          const saved = today.values.find(
            (value) => value.metric._id === metric._id,
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

        setMetrics(formatted);
        console.log(formatted);
      } catch (error) {
        console.error(error);
      }
    };

    loadMetrics();
  }, []);

  const updateMetric = (id, value) => {
    setMetrics((prev) =>
      prev.map((metric) => (metric._id === id ? { ...metric, value } : metric)),
    );
  };
  const handleSave = async () => {
    try {
      await saveToday(
        metrics.map((metric) => ({
          metric: metric._id,
          value: metric.value,
        })),
      );

      alert("Today's progress saved!");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">Today's Mission</h1>

      <div className="space-y-6">
        {metrics.map((metric) => (
          <MetricRenderer
            key={metric._id}
            metric={metric}
            onChange={(value) => updateMetric(metric._id, value)}
          />
        ))}

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white rounded-xl py-3"
        >
          Save Today's Progress
        </button>
      </div>
    </MainLayout>
  );
}

export default Today;
