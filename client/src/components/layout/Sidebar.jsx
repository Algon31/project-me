import { NavLink } from "react-router-dom";
import { House, LayoutDashboard, ChartColumn, Settings } from "lucide-react";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `
flex
items-center
gap-3
rounded-xl
px-4
py-3
font-medium
transition-colors

${
  isActive
    ? "bg-[var(--pcolor)] text-[var(--scolor)]"
    : "text-[var(--text)] hover:bg-[var(--scolor)]"
}
`;

  return (
    <aside
      className="
        w-[260px]
        min-h-[calc(100vh-64px)]
        bg-white
        border-r
        border-[var(--border)]
        px-6
        py-8
        "
    >
      <h2 className="text-3xl font-bold text-[var(--pcolor)] mb-10">
        Project : ME
      </h2>

      <nav className="space-y-2">
        <NavLink to="/today" className={linkClass}>
          <House size={20} />
          Today
        </NavLink>

        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/analytics" className={linkClass}>
          <ChartColumn size={20} />
          Analytics
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
