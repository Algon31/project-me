import { useEffect, useState } from "react";
import Button from "../../../shared/components/Button";
import { Plus, X } from "lucide-react";

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
  subQuests: [],
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
  const [newSubQuestText, setNewSubQuestText] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyForm,
        ...initialData,
        subQuests: initialData.subQuests || [],
      });
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

  const addSubQuest = () => {
    const trimmed = newSubQuestText.trim();
    if (!trimmed) return;
    if (form.subQuests.includes(trimmed)) return;

    setForm({
      ...form,
      subQuests: [...form.subQuests, trimmed],
    });
    setNewSubQuestText("");
  };

  const removeSubQuest = (indexToRemove) => {
    setForm({
      ...form,
      subQuests: form.subQuests.filter((_, idx) => idx !== indexToRemove),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    if (!initialData) {
      setForm(emptyForm);
    }
  };

  const inputStyle = "w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";
  const labelStyle = "mb-2 block text-sm font-semibold text-slate-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-slate-200">
      <div>
        <label className={labelStyle}>Quest Name</label>
        <input
          className={inputStyle}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Gym Workout, Study Session, Morning Routine..."
          required
        />
      </div>

      <div>
        <label className={labelStyle}>Description</label>
        <textarea
          rows={2}
          className={`${inputStyle} resize-none`}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="What do you need to accomplish?"
        />
      </div>

      {/* Sub-Quests / Sub-Tasks Checklist Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-3">
        <label className={labelStyle}>
          Sub-Quests / Checklist <span className="text-xs text-slate-400 font-normal">(Optional exercises or sub-tasks)</span>
        </label>

        <div className="flex gap-2">
          <input
            className={inputStyle}
            placeholder="e.g. Arms, Legs, Biceps, Chest Press, 10 Pages..."
            value={newSubQuestText}
            onChange={(e) => setNewSubQuestText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSubQuest();
              }
            }}
          />
          <button
            type="button"
            onClick={addSubQuest}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition"
          >
            <Plus size={16} /> Add
          </button>
        </div>

        {form.subQuests.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {form.subQuests.map((sub, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-indigo-300 border border-indigo-500/20"
              >
                <span>🎯 {sub}</span>
                <button
                  type="button"
                  onClick={() => removeSubQuest(idx)}
                  className="text-slate-400 hover:text-rose-400 transition"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Category</label>
          <select
            className={inputStyle}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="Physical" className="bg-slate-900 text-white">Physical</option>
            <option value="Mind" className="bg-slate-900 text-white">Mind</option>
            <option value="Lifestyle" className="bg-slate-900 text-white">Lifestyle</option>
          </select>
        </div>

        <div>
          <label className={labelStyle}>Quest Type</label>
          <select
            className={inputStyle}
            value={form.questType}
            onChange={(e) => setForm({ ...form, questType: e.target.value })}
          >
            <option value="Core" className="bg-slate-900 text-white">Core (Required for Streaks)</option>
            <option value="Growth" className="bg-slate-900 text-white">Growth (Bonus)</option>
            <option value="Side" className="bg-slate-900 text-white">Side Quest</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Input Type</label>
          <select
            className={inputStyle}
            value={form.inputType}
            onChange={(e) => setForm({ ...form, inputType: e.target.value })}
          >
            <option value="checkbox" className="bg-slate-900 text-white">Checkbox (Done / Not Done)</option>
            <option value="number" className="bg-slate-900 text-white">Numeric (e.g. 50 pushups, 20 pages)</option>
            <option value="text" className="bg-slate-900 text-white">Text Log</option>
          </select>
        </div>

        <div>
          <label className={labelStyle}>XP Type</label>
          <select
            className={inputStyle}
            value={form.xpType}
            onChange={(e) => setForm({ ...form, xpType: e.target.value })}
          >
            <option value="fixed" className="bg-slate-900 text-white">Fixed Reward</option>
            <option value="perUnit" className="bg-slate-900 text-white">Per Unit Reward</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className={labelStyle}>XP Reward</label>
          <input
            type="number"
            className={inputStyle}
            value={form.xpReward}
            onChange={(e) => setForm({ ...form, xpReward: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className={labelStyle}>Max XP / Day</label>
          <input
            type="number"
            className={inputStyle}
            value={form.maxXpPerDay}
            onChange={(e) => setForm({ ...form, maxXpPerDay: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className={labelStyle}>Unlock Level</label>
          <input
            type="number"
            className={inputStyle}
            value={form.unlockLevel}
            onChange={(e) => setForm({ ...form, unlockLevel: Number(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <label className={labelStyle}>Affected Attributes</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {attributes.map((attribute) => {
            const isSelected = form.affectsAttributes.includes(attribute);
            return (
              <button
                type="button"
                key={attribute}
                onClick={() => handleAttributeChange(attribute)}
                className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-500/15 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span>{attribute}</span>
                {isSelected && <span className="text-indigo-400 font-bold">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={labelStyle}>Skill Association (Optional)</label>
        <input
          className={inputStyle}
          placeholder="e.g. Weightlifting, Programming, Reading..."
          value={form.skill}
          onChange={(e) => setForm({ ...form, skill: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="antiFarm"
          checked={form.antiFarm}
          onChange={(e) => setForm({ ...form, antiFarm: e.target.checked })}
          className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-indigo-500 focus:ring-indigo-500"
        />
        <label htmlFor="antiFarm" className="text-sm font-medium text-slate-300 cursor-pointer">
          Enable Anti-Farming Protection
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          Cancel
        </button>

        <Button type="submit">
          {submitText}
        </Button>
      </div>
    </form>
  );
}

export default QuestForm;