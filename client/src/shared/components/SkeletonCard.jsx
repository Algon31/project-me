function SkeletonCard() {
  return (
    <div className="h-28 animate-pulse rounded-3xl border border-slate-800 bg-[#0f172a] p-6 text-slate-100 shadow-xl backdrop-blur-xl mb-4">
      <div className="h-5 w-1/3 rounded-lg bg-slate-800" />
      <div className="mt-4 h-4 w-2/3 rounded-lg bg-slate-800/60" />
    </div>
  );
}

export default SkeletonCard;