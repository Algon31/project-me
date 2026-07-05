import { useEffect, useState } from "react";

import Button from "../../../shared/components/Button";

function MetricForm({
  onSubmit,
  onCancel,
  initialData = null,
  submitText = "Create Metric",
}) {
  const emptyForm = {
    name: "",
    type: "checkbox",
    weight: 10,
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);

    if (!initialData) {
      setForm(emptyForm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Metric Name
        </label>

        <input
          className="w-full rounded-xl border border-[var(--border)] bg-white p-3 outline-none focus:border-[var(--pcolor)]"
          placeholder="e.g. Gym, Reading, Meditation"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Metric Type
        </label>

        <select
          className="w-full rounded-xl border border-[var(--border)] bg-white p-3 outline-none focus:border-[var(--pcolor)]"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
            })
          }
        >
          <option value="checkbox">Checkbox</option>
          <option value="number">Number</option>
          <option value="text">Text</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Points
        </label>

        <input
          type="number"
          min="1"
          className="w-full rounded-xl border border-[var(--border)] bg-white p-3 outline-none focus:border-[var(--pcolor)]"
          value={form.weight}
          onChange={(e) =>
            setForm({
              ...form,
              weight: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          className="w-auto bg-gray-300 px-6 text-black hover:bg-gray-400"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" className="w-auto px-6">
          {submitText}
        </Button>
      </div>
    </form>
  );
}

export default MetricForm;