import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import PageHeader from "../../../shared/components/PageHeader";

import MetricForm from "../components/MetricForm";
import MetricList from "../components/MetricList";

import {
  getMetrics,
  createMetric,
  updateMetric,
  deleteMetric,
} from "../services/settingsService";

function Settings() {
  const [metrics, setMetrics] = useState([]);
  const [editingMetric, setEditingMetric] = useState(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await getMetrics();
      setMetrics(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMetric = async (metric) => {
    try {
      await createMetric(metric);
      loadMetrics();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateMetric = async (metric) => {
    try {
      await updateMetric(editingMetric._id, metric);

      setEditingMetric(null);

      loadMetrics();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMetric = async (id) => {
    try {
      await deleteMetric(id);
      loadMetrics();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Customize Your Day"
        subtitle="Choose what you want to track."
      />

      <div className="mt-8">
        <MetricForm
          initialData={editingMetric}
          onSubmit={editingMetric ? handleUpdateMetric : handleAddMetric}
          submitText={editingMetric ? "Update Metric" : "Create Metric"}
        />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">
          Your Metrics
        </h2>

        {metrics.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white p-10 text-center">
            <h3 className="text-lg font-semibold">
              No Metrics Yet
            </h3>

            <p className="mt-2 text-gray-500">
              Use the form above to create your first metric.
            </p>
          </div>
        ) : (
          <MetricList
            metrics={metrics}
            onEdit={setEditingMetric}
            onDelete={handleDeleteMetric}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default Settings;