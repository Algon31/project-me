import Button from "../../../shared/components/Button";
import { Sparkles, Trophy, Shield, Star } from "lucide-react";

function QuestCompletedModal({ open, result, onClose }) {
  if (!open || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-indigo-500/30 bg-slate-900 p-8 shadow-2xl text-white text-center relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/20 blur-3xl pointer-events-none rounded-full" />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 mb-4 shadow-[0_0_25px_rgba(99,102,241,0.3)]">
          <Trophy size={32} className="text-amber-400" />
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">
          <Sparkles size={14} className="text-amber-400 animate-pulse" /> Victory
        </div>

        <h1 className="text-3xl font-black text-white">QUEST COMPLETED</h1>

        <p className="mt-2 text-lg font-bold text-slate-200">
          {result.questName}
        </p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">XP Earned</span>
            <span className="font-mono text-base font-bold text-indigo-400">
              +{result.xpEarned} XP
            </span>
          </div>

          <div className="h-[1px] bg-slate-800" />

          <div className="flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Shield size={14} className="text-indigo-400" /> Level
            </span>
            <span className="font-bold text-white">Lv. {result.level}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Star size={14} className="text-amber-400" /> Rank
            </span>
            <span className="font-bold text-amber-400">Rank {result.rank}</span>
          </div>
        </div>

        <Button className="mt-6 w-full" onClick={onClose}>
          Continue Journey
        </Button>
      </div>
    </div>
  );
}

export default QuestCompletedModal;