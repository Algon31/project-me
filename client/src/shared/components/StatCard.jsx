function StatCard({ title, value, icon, subtitle, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 text-white ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-[11px] text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
            {icon}
          </div>
        )}
      </div>

      <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;