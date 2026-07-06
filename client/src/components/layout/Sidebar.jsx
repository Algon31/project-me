import { NavLink } from "react-router-dom";
import {
  House,
  LayoutDashboard,
  ChartColumn,
  Settings,
  Trophy,
  Bell,
  Target,
} from "lucide-react";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `
flex
items-center
gap-3
rounded-xl
bg-[var(--pcolor)]
text-[var(--pcolor)]
px-4
py-3
font-medium
transition-colors

${
  isActive
    ? "bg-[var(--scolor)] text-[var(--pcolor)]"
    : "text-[var(--text)] hover:bg-[var(--scolor)]"
}
`;

  return (
    <aside
      className="
        w-60
        h-full
        bg-[var(--pcolor)]
        border-r
        border-[var(--border)]
        px-6
        py-8
        text-[var(--scolor)]
        "
    >
      <nav className="space-y-2">
        <NavLink to="/status" className={linkClass}>
          <LayoutDashboard size={20} />
          Status
        </NavLink>

        <NavLink to="/today" className={linkClass}>
          <House size={20} />
          Daily Quests
        </NavLink>

        <NavLink to="/analytics" className={linkClass}>
          <ChartColumn size={20} />
          Progress
        </NavLink>
        <NavLink to="/goals" className={linkClass}>
          <Target size={20} />
          Main Quests
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <Settings size={20} />
          Forge
        </NavLink>
        <NavLink to="/achievements" className={linkClass}>
          <Trophy size={20} />
          Achievements
        </NavLink>
        <NavLink to="/notifications" className={linkClass}>
          <Bell size={20} />
          Notifications
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
