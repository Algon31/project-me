import Card from "../../../shared/components/Card";
import Button from "../../../shared/components/Button";
import { Zap, Edit, Trash2 } from "lucide-react";

function QuestItem({ quest, onEdit, onDelete }) {
  return (
    <Card className="hover:border-indigo-500/40 transition-all">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-white sm:text-2xl">
              {quest.name}
            </h2>

            <span className="rounded-full bg-indigo-500/10 px-3 py-0.5 text-xs font-bold text-indigo-400 border border-indigo-500/20">
              {quest.category}
            </span>

            <span className={`rounded-full px-3 py-0.5 text-xs font-bold border ${
              quest.questType === "Core"
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                : "bg-purple-500/10 text-purple-400 border-purple-500/20"
            }`}>
              {quest.questType}
            </span>
          </div>

          {quest.description && (
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {quest.description}
            </p>
          )}

          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-slate-400 border-t border-slate-800/80 pt-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Input Type</p>
              <p className="mt-1 font-semibold text-slate-200 capitalize">{quest.inputType}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">XP Reward</p>
              <p className="mt-1 font-semibold text-indigo-400 flex items-center gap-1">
                <Zap size={14} className="text-amber-400" /> +{quest.xpReward} XP
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Unlock Level</p>
              <p className="mt-1 font-semibold text-slate-200">Lv. {quest.unlockLevel || 1}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Skill</p>
              <p className="mt-1 font-semibold text-slate-200">{quest.skill || "None"}</p>
            </div>
          </div>

          {quest.affectsAttributes && quest.affectsAttributes.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-500 font-bold mr-1">Affects:</span>
              {quest.affectsAttributes.map((attribute) => (
                <span
                  key={attribute}
                  className="rounded-md bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700/50"
                >
                  +{attribute}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 lg:flex-col lg:justify-center">
          <Button
            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold"
            onClick={() => onEdit(quest)}
          >
            <Edit size={14} /> Edit
          </Button>

          <button
            onClick={() => onDelete(quest._id)}
            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-2.5 text-xs font-bold text-rose-400 transition hover:bg-rose-500/20 hover:text-rose-300"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </Card>
  );
}

export default QuestItem;