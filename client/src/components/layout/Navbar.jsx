import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDown, Shield, LogOut, User as UserIcon, Settings, Trophy, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 sm:h-20 items-center justify-between border-b border-slate-800 bg-[#090e1a]/95 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-blue-600 shadow-md shrink-0">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <div>
          <h1 className="text-base sm:text-xl font-black tracking-tight text-white leading-tight">
            PROJECT <span className="text-blue-400">: ME</span>
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Level up yourself in real life • <span className="text-slate-300 font-medium">{today}</span>
          </p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-3 py-1.5 sm:px-3.5 sm:py-2 text-slate-200 transition hover:border-slate-700 hover:bg-slate-800"
        >
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-blue-600 font-bold text-white text-xs sm:text-sm shrink-0">
            {user?.name?.[0]?.toUpperCase() || <UserIcon size={14} />}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold leading-tight text-white">{user?.name}</p>
            <p className="text-[11px] text-blue-400 font-medium">Main Character</p>
          </div>
          <ChevronDown
            size={14}
            className={`text-slate-400 transition-transform duration-200 ${
              open ? "rotate-180 text-white" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-1.5 text-slate-200 shadow-2xl z-50">
            <div className="border-b border-slate-800 px-3.5 py-3">
              <p className="font-semibold text-white text-sm">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate mt-0.5">{user?.email}</p>
            </div>

            <div className="p-1 space-y-0.5">
              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-indigo-300 transition hover:bg-slate-800 hover:text-white"
              >
                <Settings size={16} className="text-indigo-400" />
                The Forge (Quest Manager)
              </Link>

              <Link
                to="/achievements"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-amber-300 transition hover:bg-slate-800 hover:text-white"
              >
                <Trophy size={16} className="text-amber-400" />
                Trophy Vault & Badges
              </Link>

              <Link
                to="/notifications"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-rose-300 transition hover:bg-slate-800 hover:text-white"
              >
                <Bell size={16} className="text-rose-400" />
                Notifications & Logs
              </Link>
            </div>

            <div className="p-1 border-t border-slate-800 mt-1">
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-rose-400 transition hover:bg-rose-500/10 hover:text-rose-300"
              >
                <LogOut size={16} />
                Logout Session
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;