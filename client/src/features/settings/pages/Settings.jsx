import { useEffect, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import PageHeader from "../../../shared/components/PageHeader";
import Button from "../../../shared/components/Button";
import Card from "../../../shared/components/Card";
import EmptyState from "../../../shared/components/EmptyState";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";
import MetricForm from "../components/MetricForm";
import MetricList from "../components/MetricList";
import { showError , showSuccess } from "@/lib/toast";

import {
  getMetrics,
  createMetric,
  updateMetric,
  deleteMetric,
} from "../services/settingsService";

function Settings() {
  const [metrics, setMetrics] = useState([]);
  const [editingMetric, setEditingMetric] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await getMetrics();
      setMetrics(data);
    } catch (error) {
      showError(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleAddMetric = async (metric) => {
    try {
      await createMetric(metric);

      setOpen(false);
      loadMetrics();
    } catch (error) {
      showError(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleUpdateMetric = async (metric) => {
    try {
      await updateMetric(editingMetric._id, metric);

      setEditingMetric(null);
      setOpen(false);

      loadMetrics();
    } catch (error) {
      showError(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleDeleteMetric = async () => {
    try {
      await deleteMetric(deleteId);

      showSuccess("Metric deleted.");

      loadMetrics();
    } catch (error) {
      showError(error.response?.data?.message || "Unable to delete metric.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <MainLayout>
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <PageHeader
          title="Customize Your Day"
          subtitle="Build the routine you want to improve every day."
        />

        <Button
          className="w-full md:w-auto"
          onClick={() => {
            setEditingMetric(null);
            setOpen(true);
          }}
        >
          + Create Metric
        </Button>
      </div>

      {open && (
        <Card className="mb-10">
          <h2 className="mb-6 text-2xl font-semibold">
            {editingMetric ? "Edit Metric" : "Create New Metric"}
          </h2>

          <MetricForm
            initialData={editingMetric}
            onSubmit={editingMetric ? handleUpdateMetric : handleAddMetric}
            submitText={editingMetric ? "Update Metric" : "Create Metric"}
            onCancel={() => {
              setEditingMetric(null);
              setOpen(false);
            }}
          />
        </Card>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold">Your Metrics</h2>

        <p className="text-[var(--muted)]">
          Manage the habits and activities you track every day.
        </p>
      </div>

      {metrics.length === 0 ? (
        <EmptyState
          title="No Metrics Yet"
          description="Start by creating your first metric."
          buttonText="Create Metric"
          onClick={() => {
            setEditingMetric(null);
            setOpen(true);
          }}
        />
      ) : (
        <MetricList
          metrics={metrics}
          onEdit={(metric) => {
            setEditingMetric(metric);

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });

            setOpen(true);
          }}
          onDelete={(id) => setDeleteId(id)}
        />
      )}
      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Metric?"
        message="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteMetric}
        onCancel={() => setDeleteId(null)}
      />
    </MainLayout>
  );
}

export default Settings;
