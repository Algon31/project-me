import { useState } from "react";
import Card from "../../../shared/components/Card";
import { Zap, Target, Calendar, CheckCircle2, Trash2, Trophy, Coins } from "lucide-react";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";

function GoalCard({ goal, onUpdate, onDelete }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const milestones = goal.milestones || [];
  
  const completedMilestonesCount = milestones.filter((m) => m.completed).length;
  const progressPercent = milestones.length > 0
    ? Math.min(Math.round((completedMilestonesCount / milestones.length) * 100), 100)
    : goal.completed ? 100 : goal.progress || 0;

  const toggleMilestone = (index) => {
    const updatedMilestones = milestones.map((m, idx) =>
      idx === index ? { ...m, completed: !m.completed } : m
    );

    const newCompletedCount = updatedMilestones.filter((m) => m.completed).length;
    const isAllDone = updatedMilestones.length > 0 && newCompletedCount === updatedMilestones.length;

    onUpdate(goal._id, {
      ...goal,
      milestones: updatedMilestones,
      progress: Math.round((newCompletedCount / updatedMilestones.length) * 100),
      completed: isAllDone,
    });
  };

  const handleMarkComplete = () => {
    onUpdate(goal._id, {
      ...goal,
      completed: true,
      progress: 100,
    });
  };

  // Calculate deadline days remaining
  let deadlineText = null;
  let isOverdue = false;

  if (goal.deadline) {
    const deadlineDate = new Date(goal.deadline);
    const now = new Date();
    const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      deadlineText = `${Math.abs(diffDays)} days overdue`;
      isOverdue = true;
    } else if (diffDays === 0) {
      deadlineText = "Due today!";
    } else {
      deadlineText = `${diffDays} days left`;
    }
  }

  return (
    <>
      <Card className={`transition-all duration-300 ${goal.completed ? "border-emerald-500/30 bg-emerald-950/10" : "hover:border-slate-700"}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1 rounded-xl bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/20">
                <Target size={14} /> {goal.category || "Main"} Campaign
              </span>

              {deadlineText && (
                <span
                  className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold border ${
                    isOverdue
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      : "bg-slate-800 text-slate-300 border-slate-700"
                  }`}
                >
                  <Calendar size={13} /> {deadlineText}
                </span>
              )}
            </div>

            <h2 className="text-xl font-black text-white">{goal.title}</h2>

            {goal.description && (
              <p className="text-sm text-slate-400 leading-relaxed">
                {goal.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 rounded-xl bg-amber-500/10 px-3 py-1.5 text-xs font-black text-amber-400 border border-amber-500/20 shadow-sm">
                <Zap size={14} /> +{goal.xpReward || 1000} Boss XP
              </div>
              {goal.goldReward > 0 && (
                <div className="flex items-center gap-1 text-[11px] font-bold text-yellow-400">
                  <Coins size={12} /> +{goal.goldReward} Gold
                </div>
              )}
            </div>

            <button
              onClick={() => setShowConfirmDelete(true)}
              className="text-slate-500 hover:text-rose-400 p-2 transition"
              title="Abandon Quest"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Milestone Checklist */}
        {milestones.length > 0 && (
          <div className="mt-5 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Trophy size={14} /> Milestone Stages ({completedMilestonesCount} / {milestones.length})
              </span>
              <span className="font-mono text-amber-400">{progressPercent}%</span>
            </div>

            <div className="grid gap-2">
              {milestones.map((milestone, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => toggleMilestone(idx)}
                  className={`flex items-center justify-between rounded-xl border p-3 text-xs font-semibold transition ${
                    milestone.completed
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <span className="truncate">Stage {idx + 1}: {milestone.title}</span>
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] ${
                      milestone.completed
                        ? "border-emerald-500 bg-emerald-500 text-white font-bold"
                        : "border-slate-700 bg-slate-950"
                    }`}
                  >
                    {milestone.completed && "✓"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Progress Status</span>
            <span className="font-bold text-amber-400">{progressPercent}% Completed</span>
          </div>

          <div className="h-3 rounded-full bg-slate-950 p-0.5 border border-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Complete Quest Action Button */}
        {!goal.completed && milestones.length === 0 && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={handleMarkComplete}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition"
            >
              <CheckCircle2 size={16} /> Mark Campaign Complete
            </button>
          </div>
        )}

        {goal.completed && (
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
            <CheckCircle2 size={16} />
            <span>Main Quest Completed! Campaign Boss Victory Claimed.</span>
          </div>
        )}
      </Card>

      <ConfirmDialog
        open={showConfirmDelete}
        title="Abandon Main Quest?"
        message={`Are you sure you want to abandon "${goal.title}"? Progress will be lost.`}
        onConfirm={() => {
          onDelete(goal._id);
          setShowConfirmDelete(false);
        }}
        onCancel={() => setShowConfirmDelete(false)}
      />
    </>
  );
}

export default GoalCard;