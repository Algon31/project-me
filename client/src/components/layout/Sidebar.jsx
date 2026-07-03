import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="w-60 border-r h-full p-4">
            <nav className="flex flex-col gap-4">

                <Link to="/today">Today</Link>

                <Link to="/dashboard">Dashboard</Link>

                <Link to="/analytics">Analytics</Link>

                <Link to="/settings">Settings</Link>

                <Link to="/">Logout</Link>

            </nav>
        </aside>
    );
}

export default Sidebar;