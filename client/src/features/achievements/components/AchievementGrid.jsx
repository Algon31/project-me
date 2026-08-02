import { useState } from "react";
import { Lock, Trophy, EyeOff, CheckCircle2, HelpCircle, X, Info } from "lucide-react";

const CATEGORIES = ["All", "Progression", "Consistency", "XP Milestones", "Campaigns", "Mastery", "Secret"];

function AchievementGrid({ achievements = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  const filteredAchievements = achievements.filter(
    (a) => activeCategory === "All" || a.category === activeCategory
  );

  return (
    <div className="space-y-8">
      {/* Achievements Summary Header - Cleaned up without hidden quest mentions */}
      <div className="rounded-3xl border border-slate-800 bg-[#0f172a] p-6 shadow-xl backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Trophy size={14} className="text-amber-400" /> Trophy Room & Vault
            </div>
            <h2 className="mt-1.5 text-3xl font-black text-white sm:text-4xl">
              {unlockedCount} <span className="text-slate-500 text-xl font-medium">/ {totalCount} Unlocked</span>
            </h2>
            <p className="mt-1.5 text-xs text-slate-400">
              Permanent milestones and badges earned on your journey.
            </p>
          </div>

          <div className="w-full sm:w-64 space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Vault Progress</span>
              <span className="font-bold text-amber-400">{progressPercent}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-950 p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 transition-all duration-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${
              activeCategory === cat
                ? "border-blue-500 bg-blue-500/15 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            {cat === "Secret" ? "🔒 Secret" : cat}
          </button>
        ))}
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAchievements.map((achievement) => {
          const isUnlocked = achievement.unlocked;
          const isSecret = achievement.isSecret;

          return (
            <div
              key={achievement._id || achievement.key}
              onClick={() => setSelectedAchievement(achievement)}
              className={`group relative overflow-hidden rounded-3xl border p-5 sm:p-6 transition-all duration-300 backdrop-blur-xl cursor-pointer ${
                isUnlocked
                  ? "bg-slate-900/90 border-indigo-500/40 text-white shadow-xl hover:-translate-y-1"
                  : isSecret
                  ? "bg-purple-950/20 border-purple-900/40 text-purple-300"
                  : "bg-slate-950/70 border-slate-800/80 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border text-2xl sm:text-3xl shrink-0 ${
                    isUnlocked
                      ? "border-indigo-500/30 bg-indigo-500/10"
                      : isSecret
                      ? "border-purple-800/40 bg-purple-950/40 text-purple-400"
                      : "border-slate-800 bg-slate-900 text-slate-500"
                  }`}>
                    {achievement.icon || "🏆"}
                  </div>

                  <div>
                    <h3 className={`text-base sm:text-lg font-black ${isUnlocked ? "text-white" : isSecret ? "text-purple-200" : "text-slate-300"}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 sm:hidden flex items-center gap-1 mt-0.5 font-medium">
                      <Info size={12} className="text-blue-400" /> Tap to view details
                    </p>
                  </div>
                </div>

                <div>
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 size={12} /> Unlocked
                    </span>
                  ) : isSecret ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-purple-400 border border-purple-500/20">
                      <HelpCircle size={12} /> Secret
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-slate-400 border border-slate-700">
                      <Lock size={12} /> Locked
                    </span>
                  )}
                </div>
              </div>

              {/* Desktop Details View */}
              <div className="hidden sm:block mt-4 space-y-2">
                <p className="text-xs text-slate-400 leading-relaxed">
                  {achievement.description}
                </p>

                {!isUnlocked && achievement.requirement && (
                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>How to achieve:</span>
                    <span className={`font-semibold ${isSecret ? "text-purple-400 font-bold" : "text-slate-300"}`}>
                      {achievement.requirement}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement Details Modal for Mobile & Tap View */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-[#0f172a] p-6 text-slate-100 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-3xl">
                  {selectedAchievement.icon || "🏆"}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">
                    {selectedAchievement.title}
                  </h3>
                  <span className="mt-1 inline-block rounded-lg bg-slate-800 px-2.5 py-0.5 text-[11px] font-semibold text-slate-400">
                    {selectedAchievement.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedAchievement(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Description</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedAchievement.description}
              </p>

              <div className="pt-2 border-t border-slate-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">How to Achieve</p>
                <p className="text-xs text-slate-300 mt-1 font-mono">
                  {selectedAchievement.requirement || "Complete special requirements."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Status:</span>
              <span className={`font-bold ${selectedAchievement.unlocked ? "text-emerald-400" : "text-amber-400"}`}>
                {selectedAchievement.unlocked ? "Unlocked 🏆" : "Locked 🔒"}
              </span>
            </div>

            <button
              onClick={() => setSelectedAchievement(null)}
              className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-500 transition"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AchievementGrid;