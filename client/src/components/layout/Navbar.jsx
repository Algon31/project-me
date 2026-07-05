import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="h-20 px-10 bg-[var(--pcolor)] text-[var(--scolor)] px-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Project : ME</h1>

        <p className="text-xs opacity-80">One day at a time.</p>

        <p className="text-sm opacity-80">{today}</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-semibold">{user?.name}</p>

          <p className="text-sm opacity-80">Welcome Back</p>
        </div>

        <button
          onClick={handleLogout}
          className="
rounded-xl
bg-white
text-[var(--pcolor)]
px-5
py-2
font-semibold
hover:bg-[var(--bg)]
transition-colors
"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
