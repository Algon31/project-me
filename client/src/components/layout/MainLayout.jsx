import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <div className="flex min-h-[calc(100vh-80px)]">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 py-4 pb-24">
            {children}
          </div>
        </main>
      </div>

      <BottomNav />
    </>
  );
}

export default MainLayout;
