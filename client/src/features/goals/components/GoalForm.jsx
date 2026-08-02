import { useState } from "react";
import Button from "../../../shared/components/Button";
import { Plus, X, Award, Target, Calendar } from "lucide-react";

const emptyGoal = {
  title: "",
  description: "",
  category: "Mind",
  target: 100,
  xpReward: 1000,
  goldReward: 100,
  deadline: "",
  milestones: [],
};

const CATEGORIES = ["Physical", "Mind", "Career", "Life"];

function GoalForm({ onSubmit, onCancel }) {
  const [goal, setGoal] = useState(emptyGoal);
  const [milestoneInput, setMilestoneInput] = useState("");

  const addMilestone = () => {
    const trimmed = milestoneInput.trim();
    if (!trimmed) return;
    setGoal((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { title: trimmed, completed: false }],
    }));
    setMilestoneInput("");
  };

  const removeMilestone = (index) => {
    setGoal((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, idx) => idx !== index),
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(goal);
    setGoal(emptyGoal);
  }

  const inputStyle = "w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
  const labelStyle = "mb-2 block text-sm font-semibold text-slate-300 flex items-center gap-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-800 bg-[#0f172a] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Target className="text-amber-400" size={22} />
            Forge New Main Quest
          </h2>
          <p className="text-xs text-slate-400 mt-1">Set long-term milestones and claim massive Boss XP rewards upon completion.</p>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div>
        <label className={labelStyle}>Main Quest Title</label>
        <input
          className={inputStyle}
          placeholder="e.g. Run a 10km Marathon, Launch SaaS Product, Read 12 Books..."
          value={goal.title}
          onChange={(e) => setGoal({ ...goal, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label className={labelStyle}>Campaign Objective & Details</label>
        <textarea
          className={`${inputStyle} resize-none`}
          rows={2}
          placeholder="What is your target metric or end goal?"
          value={goal.description}
          onChange={(e) => setGoal({ ...goal, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelStyle}>Category</label>
          <select
            className={inputStyle}
            value={goal.category}
            onChange={(e) => setGoal({ ...goal, category: e.target.value })}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900 text-white">
                {cat} Campaign
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelStyle}>
            <Calendar size={16} className="text-blue-400" /> Target Deadline Date
          </label>
          <input
            type="date"
            className={inputStyle}
            value={goal.deadline}
            onChange={(e) => setGoal({ ...goal, deadline: e.target.value })}
          />
        </div>
      </div>

      {/* Milestones / Checkpoints builder */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-3">
        <label className={labelStyle}>
          <Award size={16} className="text-amber-400" /> Milestone Stages Checkpoints
        </label>
        <p className="text-xs text-slate-400">Break down your epic campaign into step-by-step checkpoints.</p>

        <div className="flex gap-2">
          <input
            className={inputStyle}
            placeholder="e.g. Stage 1: Run 3km, Stage 2: Run 5km..."
            value={milestoneInput}
            onChange={(e) => setMilestoneInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addMilestone();
              }
            }}
          />
          <button
            type="button"
            onClick={addMilestone}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-500 transition"
          >
            <Plus size={16} /> Add Stage
          </button>
        </div>

        {goal.milestones.length > 0 && (
          <div className="space-y-2 pt-2">
            {goal.milestones.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-200"
              >
                <span>Stage {idx + 1}: {m.title}</span>
                <button
                  type="button"
                  onClick={() => removeMilestone(idx)}
                  className="text-slate-400 hover:text-rose-400 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelStyle}>Boss XP Reward</label>
          <select
            className={inputStyle}
            value={goal.xpReward}
            onChange={(e) => setGoal({ ...goal, xpReward: Number(e.target.value) })}
          >
            <option value={500} className="bg-slate-900 text-white">+500 XP (Standard Quest)</option>
            <option value={1000} className="bg-slate-900 text-white">+1,000 XP (Major Milestone)</option>
            <option value={2000} className="bg-slate-900 text-white">+2,000 XP (Epic Boss Victory)</option>
          </select>
        </div>

        <div>
          <label className={labelStyle}>Gold Coin Reward</label>
          <input
            type="number"
            className={inputStyle}
            value={goal.goldReward}
            onChange={(e) => setGoal({ ...goal, goldReward: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-700"
          >
            Cancel
          </button>
        )}

        <Button type="submit" className="w-full sm:w-auto">
          Start Main Quest Campaign
        </Button>
      </div>
    </form>
  );
}

export default GoalForm;