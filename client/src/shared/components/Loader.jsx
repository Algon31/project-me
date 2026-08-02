import { Shield } from "lucide-react";
import SkeletonCard from "./SkeletonCard";

function Loader() {
  return (
    <div className="space-y-4 py-8">
      <div className="flex items-center justify-center gap-3 py-6 text-slate-400">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 animate-bounce">
          <Shield size={20} />
        </div>
        <span className="text-sm font-semibold text-slate-300">Loading Status...</span>
      </div>

      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

export default Loader;
