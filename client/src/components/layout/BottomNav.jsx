import { NavLink } from "react-router-dom";
import {
  House,
  LayoutDashboard,
  ChartColumn,
  Target,
} from "lucide-react";

function BottomNav() {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 py-2 px-4 text-[11px] font-medium transition-all ${
      isActive
        ? "text-blue-400 font-bold scale-105"
        : "text-slate-400 hover:text-slate-200"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-slate-800/80 bg-[#090e1a]/95 px-2 backdrop-blur-xl md:hidden">
      <NavLink to="/status" className={linkClass}>
        <LayoutDashboard size={20} />
        Status
      </NavLink>

      <NavLink to="/today" className={linkClass}>
        <House size={20} />
        Quests
      </NavLink>

      <NavLink to="/goals" className={linkClass}>
        <Target size={20} />
        Main
      </NavLink>

      <NavLink to="/analytics" className={linkClass}>
        <ChartColumn size={20} />
        Stats
      </NavLink>
    </nav>
  );
}

export default BottomNav;