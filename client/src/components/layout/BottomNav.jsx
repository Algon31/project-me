import { NavLink } from "react-router-dom";
import {
  Swords,
  Trophy,
  ChartColumn,
  Medal,
  Bell,
  Target,
  Hammer,
} from "lucide-react";

function BottomNav() {
  const linkClass = ({ isActive }) =>
    `
      flex
      flex-col
      items-center
      justify-center
      flex-1
      py-3
      transition-colors
      ${
        isActive
          ? "text-[var(--pcolor)]"
          : "text-[var(--muted)]"
      }
    `;

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-[var(--border)]
        bg-white
        md:hidden
      "
    >
      <div
        className="
          grid
          grid-cols-4
        "
      >
        <NavLink
          to="/today"
          className={linkClass}
        >
          <Swords size={20} />
          <span className="mt-1 text-[10px]">
            Quests
          </span>
        </NavLink>

        <NavLink
          to="/status"
          className={linkClass}
        >
          <Trophy size={20} />
          <span className="mt-1 text-[10px]">
            Status
          </span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={linkClass}
        >
          <ChartColumn size={20} />
          <span className="mt-1 text-[10px]">
            Progress
          </span>
        </NavLink>

        <NavLink
          to="/settings"
          className={linkClass}
        >
          <Hammer size={20} />
          <span className="mt-1 text-[10px]">
            Forge
          </span>
        </NavLink>
      </div>
    </nav>
  );
}

export default BottomNav;