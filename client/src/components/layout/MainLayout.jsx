import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
    return (
        <div className="h-screen flex flex-col">

            <Navbar />

            <div className="flex flex-1">

                <Sidebar />

                <main className="flex-1 p-8 overflow-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default MainLayout;