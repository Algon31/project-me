import { useEffect, useState } from "react";

import Button from "../../../shared/components/Button";

const emptyForm = {
  name: "",
  description: "",
  category: "Physical",
  questType: "Core",
  inputType: "checkbox",
  xpType: "fixed",
  xpReward: 10,
  maxXpPerDay: 100,
  antiFarm: true,
  unlockLevel: 1,
  affectsAttributes: [],
  skill: "",
  order: 0,
};

const attributes = [
  "Strength",
  "Endurance",
  "Health",
  "Knowledge",
  "Focus",
  "Creativity",
  "Discipline",
  "Consistency",
];

function QuestForm({
  initialData = null,
  onSubmit,
  onCancel,
  submitText = "Create Quest",
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleAttributeChange = (attribute) => {
    if (form.affectsAttributes.includes(attribute)) {
      setForm({
        ...form,
        affectsAttributes: form.affectsAttributes.filter(
          (a) => a !== attribute
        ),
      });
    } else {
      setForm({
        ...form,
        affectsAttributes: [...form.affectsAttributes, attribute],
      });
    }
  };

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
        <label className="mb-2 block font-medium">
          Quest Name
        </label>

        <input
          className="w-full rounded-xl border border-[var(--border)] p-3"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          placeholder="Gym"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={3}
          className="w-full rounded-xl border border-[var(--border)] p-3"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            className="w-full rounded-xl border border-[var(--border)] p-3"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          >
            <option>Physical</option>
            <option>Mind</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Quest Type
          </label>

          <select
            className="w-full rounded-xl border border-[var(--border)] p-3"
            value={form.questType}
            onChange={(e) =>
              setForm({
                ...form,
                questType: e.target.value,
              })
            }
          >
            <option>Core</option>
            <option>Growth</option>
          </select>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="mb-2 block font-medium">
            Input Type
          </label>

          <select
            className="w-full rounded-xl border border-[var(--border)] p-3"
            value={form.inputType}
            onChange={(e) =>
              setForm({
                ...form,
                inputType: e.target.value,
              })
            }
          >
            <option value="checkbox">Checkbox</option>
            <option value="number">Number</option>
            <option value="text">Text</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            XP Type
          </label>

          <select
            className="w-full rounded-xl border border-[var(--border)] p-3"
            value={form.xpType}
            onChange={(e) =>
              setForm({
                ...form,
                xpType: e.target.value,
              })
            }
          >
            <option value="fixed">Fixed</option>
            <option value="perUnit">Per Unit</option>
          </select>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <label className="mb-2 block font-medium">
            XP Reward
          </label>

          <input
            type="number"
            className="w-full rounded-xl border border-[var(--border)] p-3"
            value={form.xpReward}
            onChange={(e) =>
              setForm({
                ...form,
                xpReward: Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Max XP / Day
          </label>

          <input
            type="number"
            className="w-full rounded-xl border border-[var(--border)] p-3"
            value={form.maxXpPerDay}
            onChange={(e) =>
              setForm({
                ...form,
                maxXpPerDay: Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Unlock Level
          </label>

          <input
            type="number"
            className="w-full rounded-xl border border-[var(--border)] p-3"
            value={form.unlockLevel}
            onChange={(e) =>
              setForm({
                ...form,
                unlockLevel: Number(e.target.value),
              })
            }
          />
        </div>

      </div>

      <div>
        <label className="mb-3 block font-medium">
          Affected Attributes
        </label>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {attributes.map((attribute) => (

            <label
              key={attribute}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={form.affectsAttributes.includes(attribute)}
                onChange={() =>
                  handleAttributeChange(attribute)
                }
              />

              {attribute}

            </label>

          ))}

        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Skill
        </label>

        <input
          className="w-full rounded-xl border border-[var(--border)] p-3"
          placeholder="C++, Gym, Linux..."
          value={form.skill}
          onChange={(e) =>
            setForm({
              ...form,
              skill: e.target.value,
            })
          }
        />
      </div>

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={form.antiFarm}
          onChange={(e) =>
            setForm({
              ...form,
              antiFarm: e.target.checked,
            })
          }
        />

        <span>Enable Anti Farming</span>

      </div>

      <div className="flex justify-end gap-4">

        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black hover:bg-gray-400"
        >
          Cancel
        </Button>

        <Button type="submit">
          {submitText}
        </Button>

      </div>

    </form>
  );
}

export default QuestForm;