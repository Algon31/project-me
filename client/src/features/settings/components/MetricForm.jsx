import { useEffect, useState } from "react";

function MetricForm({
  onSubmit,
  initialData = null,
  submitText = "Add Metric",
}) {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      type: "checkbox",
      weight: 10,
    },
  );
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);

    setForm({
      name: "",
      type: "checkbox",
      weight: 10,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-lg border border-zinc-700 bg-white p-4 space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Metric</h2>

      <input
        className="w-full rounded border p-2"
        placeholder="Metric Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <select
        className="w-full rounded border p-2"
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

      <input
        type="number"
        className="w-full rounded border p-2"
        value={form.weight}
        onChange={(e) =>
          setForm({
            ...form,
            weight: Number(e.target.value),
          })
        }
      />

      <button className="rounded bg-blue-600 px-5 py-2" type="submit">
        {submitText}
      </button>
    </form>
  );
}

export default MetricForm;
