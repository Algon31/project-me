import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex h-28 items-center justify-between bg-[var(--pcolor)] px-8 text-[var(--scolor)] shadow-sm">
      <div>
        <h1 className="text-lg font-bold md:text-2xl">
          Project : ME
        </h1>

        <p className="text-xs opacity-80">
          One day at a time.
        </p>

        <p className="hidden text-sm opacity-80 md:block">
          {today}
        </p>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-white/10
            px-4
            py-2
            transition
            hover:bg-white/20
          "
        >
          <span className="font-semibold">
            {user?.name}
          </span>

          <ChevronDown
            size={18}
            className={`transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div
            className="
              absolute
              right-0
              mt-3
              w-56
              overflow-hidden
              rounded-2xl
              bg-white
              text-black
              shadow-xl
              border
              border-zinc-200
            "
          >
            <div className="border-b p-4">
              <p className="font-semibold">
                {user?.name}
              </p>

              <p className="text-sm text-gray-500">
                {user?.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="
                w-full
                px-4
                py-3
                text-left
                text-red-600
                transition-colors
                hover:bg-red-50
              "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;