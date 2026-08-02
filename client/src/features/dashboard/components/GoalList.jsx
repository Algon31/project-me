import { Target, Zap, ChevronRight, Trophy, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function GoalList({ goals = [] }) {
  const activeGoals = goals.filter((g) => !g.completed);

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0f172a] p-6 shadow-xl backdrop-blur-xl sm:p-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2.5">
            <Target size={22} className="text-amber-400" />
            Active Main Quests
          </h2>
          <p className="text-xs text-slate-400 mt-1">Long-term campaign milestones & high XP rewards.</p>
        </div>

        <Link
          to="/goals"
          className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-bold text-blue-400 hover:bg-slate-800 hover:text-blue-300 transition"
        >
          <span>View All ({goals.length})</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {activeGoals.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <p className="text-sm">No active Main Quests.</p>
          <Link
            to="/goals"
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:underline"
          >
            Forge a Main Quest campaign →
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {activeGoals.slice(0, 3).map((goal) => {
            const milestones = goal.milestones || [];
            const completedCount = milestones.filter((m) => m.completed).length;
            const progress = milestones.length > 0
              ? Math.min(Math.round((completedCount / milestones.length) * 100), 100)
              : goal.progress || 0;

            return (
              <div
                key={goal._id}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 transition hover:border-slate-700"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                      <h3 className="text-base font-bold text-white">{goal.title}</h3>
                    </div>
                    {goal.description && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {goal.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-xl bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-400 border border-amber-500/20">
                      <Zap size={14} /> +{goal.xpReward || 1000} XP
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span>
                      {milestones.length > 0
                        ? `${completedCount} / ${milestones.length} Stages`
                        : "Progress"}
                    </span>
                    <span className="font-bold text-amber-400">{progress}%</span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-900 p-0.5 border border-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-amber-500 transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GoalList;