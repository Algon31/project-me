import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-[var(--bg)]">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1">

                    <div className="mx-auto max-w-5xl px-10 py-10">

                        {children}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default MainLayout;