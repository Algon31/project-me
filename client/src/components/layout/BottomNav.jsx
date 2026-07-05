import { NavLink } from "react-router-dom";
import {
  House,
  LayoutDashboard,
  ChartColumn,
  Settings,
} from "lucide-react";

function BottomNav() {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 py-3 ${
      isActive
        ? "text-[var(--pcolor)]"
        : "text-[var(--muted)]"
    }`;

  return (
    <nav className="
      fixed
      bottom-0
      left-0
      right-0
      bg-white
      border-t
      border-[var(--border)]
      md:hidden
      z-50
    ">
      <div className="flex">

        <NavLink
          to="/today"
          className={linkClass}
        >
          <House size={20}/>
          <span className="text-xs mt-1">Today</span>
        </NavLink>

        <NavLink
          to="/dashboard"
          className={linkClass}
        >
          <LayoutDashboard size={20}/>
          <span className="text-xs mt-1">Dashboard</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={linkClass}
        >
          <ChartColumn size={20}/>
          <span className="text-xs mt-1">Analytics</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={linkClass}
        >
          <Settings size={20}/>
          <span className="text-xs mt-1">Settings</span>
        </NavLink>

      </div>
    </nav>
  );
}

export default BottomNav;