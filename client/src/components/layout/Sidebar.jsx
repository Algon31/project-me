import { NavLink } from "react-router-dom";
import {
  House,
  LayoutDashboard,
  ChartColumn,
  Settings,
  Trophy,
  Bell,
  Target,
  Sparkles,
} from "lucide-react";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-150 ${
      isActive
        ? "bg-blue-600/20 text-white border-l-4 border-blue-500 font-semibold"
        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
    }`;

  return (
    <aside className="w-64 min-h-[calc(100vh-80px)] border-r border-slate-800/80 bg-[#090e1a] px-4 py-6">
      <div className="mb-4 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
        Navigation
      </div>

      <nav className="space-y-1.5">
        <NavLink to="/status" className={linkClass}>
          <LayoutDashboard size={18} className="text-blue-400" />
          Status Window
        </NavLink>

        <NavLink to="/today" className={linkClass}>
          <House size={18} className="text-sky-400" />
          Daily Quests
        </NavLink>

        <NavLink to="/goals" className={linkClass}>
          <Target size={18} className="text-amber-400" />
          Main Quests
        </NavLink>

        <NavLink to="/analytics" className={linkClass}>
          <ChartColumn size={18} className="text-emerald-400" />
          Progress & Stats
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <Settings size={18} className="text-indigo-400" />
          The Forge
        </NavLink>

        <NavLink to="/achievements" className={linkClass}>
          <Trophy size={18} className="text-yellow-400" />
          Achievements
        </NavLink>

        <NavLink to="/notifications" className={linkClass}>
          <Bell size={18} className="text-rose-400" />
          Notifications
        </NavLink>
      </nav>

      <div className="mt-10 rounded-2xl border border-slate-800 bg-[#0f172a] p-4 text-center">
        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-2">
          <Sparkles size={18} />
        </div>
        <p className="text-xs font-bold text-slate-200">Daily Quest Bonus</p>
        <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
          Maintain your streak to earn XP multipliers!
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
