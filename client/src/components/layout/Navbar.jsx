import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="h-16 border-b flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">
                Project: ME
            </h1>

            <button onClick={handleLogout}>
                Logout
            </button>
        </header>
    );
}

export default Navbar;