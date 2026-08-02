import { Flame, Trophy, Star, Zap } from "lucide-react";

function StatStrip({ character }) {
  const stats = [
    {
      title: "Today's XP",
      value: `+${character.todayXP}`,
      subtitle: "Earned Today",
      icon: <Trophy size={20} className="text-amber-400" />,
      badgeBg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Current Streak",
      value: `${character.currentStreak} ${character.currentStreak === 1 ? "Day" : "Days"}`,
      subtitle: "Consistency Streak",
      icon: <Flame size={20} className="text-orange-400 animate-pulse" />,
      badgeBg: "bg-orange-500/10 border-orange-500/20",
    },
    {
      title: "Longest Streak",
      value: `${character.longestStreak} ${character.longestStreak === 1 ? "Day" : "Days"}`,
      subtitle: "Personal Record",
      icon: <Star size={20} className="text-purple-400" />,
      badgeBg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Total XP",
      value: `${character.totalXp}`,
      subtitle: "Lifetime Experience",
      icon: <Zap size={20} className="text-indigo-400" />,
      badgeBg: "bg-indigo-500/10 border-indigo-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {stat.title}
            </span>
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${stat.badgeBg}`}>
              {stat.icon}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-slate-400">{stat.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatStrip;
