import { Shield, Star, Award, Zap } from "lucide-react";

function CharacterHeader({ character, user }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#0f172a] p-5 shadow-xl backdrop-blur-xl sm:p-8">
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
            <Zap size={14} className="text-amber-400 shrink-0" />
            <span>Character Status</span>
          </div>

          <h1 className="mt-1.5 text-2xl font-black tracking-tight text-white break-words sm:text-3xl lg:text-4xl">
            {user?.name}
          </h1>

          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800/90 px-3 py-1 text-xs font-semibold text-slate-300 border border-slate-700/80">
              <Award size={14} className="text-blue-400 shrink-0" />
              <span>Class: {user?.selectedClass || "Hunter"}</span>
            </span>
          </div>
        </div>

        {/* Responsive Rank & Level Display */}
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-800/80 bg-[#090e1a] p-3.5 sm:flex sm:items-center sm:gap-5 sm:p-4 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Star className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">Rank</p>
              <p className="text-base sm:text-lg font-black text-amber-400 truncate">Rank {character.rank}</p>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">Level</p>
              <p className="text-base sm:text-lg font-black text-blue-400 truncate">Lv. {character.level}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterHeader;