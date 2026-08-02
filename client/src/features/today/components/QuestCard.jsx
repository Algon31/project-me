import { Zap, CheckCircle } from "lucide-react";

function QuestCard({ quest, children }) {
  return (
    <div className="group relative mb-5 rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-white sm:text-2xl">
              {quest.name}
            </h2>
            {quest.questType && (
              <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-bold border ${
                quest.questType === "Core"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
              }`}>
                {quest.questType}
              </span>
            )}
          </div>

          {quest.description && (
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {quest.description}
            </p>
          )}

          {quest.affectsAttributes && quest.affectsAttributes.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {quest.affectsAttributes.map((attr) => (
                <span key={attr} className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700/50">
                  +{attr}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3 sm:flex-col sm:justify-center sm:min-w-[110px]">
          <span className="flex items-center gap-1 text-2xl font-black text-indigo-400">
            <Zap size={18} className="text-amber-400" />
            +{quest.xpReward}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            XP Reward
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80">
        {children}
      </div>
    </div>
  );
}

export default QuestCard;