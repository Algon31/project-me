import { Sparkles } from "lucide-react";

function XPBar({ current = 0, required = 100 }) {
  const percent = Math.min(Math.round((current / required) * 100), 100);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <Sparkles size={16} className="text-indigo-400" />
          Level Progress
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            {percent}% Completed
          </span>
          <span className="font-mono text-sm font-bold text-slate-200">
            {current} <span className="text-slate-500">/</span> {required} <span className="text-xs text-slate-400">XP</span>
          </span>
        </div>
      </div>

      <div className="h-4 rounded-full bg-slate-800 p-0.5 overflow-hidden border border-slate-700/50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default XPBar;