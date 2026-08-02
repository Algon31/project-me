import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <div className="flex min-h-[calc(100vh-80px)]">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-28">
            {children}
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}

export default MainLayout;
