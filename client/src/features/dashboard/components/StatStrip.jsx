import StatCard from "../../../shared/components/StatCard";

import { Flame, Trophy, Star } from "lucide-react";

function StatStrip({ character }) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        xl:grid-cols-4
    "
    >
      <StatCard
        className="
    rounded-3xl
    border
    border-[var(--border)]
    bg-white
    p-5
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-lg
"
        title="Today's XP"
        value={`+${character.todayXP}`}
        subtitle="Earned Today"
        icon={<Trophy size={22} />}
      />

      <StatCard
        className="
    rounded-3xl
    border
    border-[var(--border)]
    bg-white
    p-5
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-lg
"
        title="Current Streak"
        value={`${character.currentStreak} Days`}
        subtitle="Keep it Alive"
        icon={<Flame size={22} />}
      />

      <StatCard
        className="
    rounded-3xl
    border
    border-[var(--border)]
    bg-white
    p-5
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-lg
"
        title="Longest Streak"
        value={`${character.longestStreak} Days`}
        subtitle="Personal Best"
        icon={<Star size={22} />}
      />
    </div>
  );
}

export default StatStrip;
