function AttributeSection({ title, attributes }) {
  if (!attributes || Object.keys(attributes).length === 0) return null;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-xl">
      <h2 className="mb-6 text-xl font-black tracking-tight text-white flex items-center justify-between">
        <span>{title} Attributes</span>
        <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
          {Object.keys(attributes).length} Stats
        </span>
      </h2>

      <div className="space-y-5">
        {Object.entries(attributes).map(([name, value]) => {
          const level = value?.level || 1;
          const xp = value?.xp || 0;
          const percent = Math.min(Math.round((xp / 100) * 100), 100);

          return (
            <div key={name} className="group">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                  {name}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">{xp} / 100 XP</span>
                  <span className="rounded-lg bg-indigo-500/10 px-2 py-0.5 font-mono text-xs font-bold text-indigo-400 border border-indigo-500/20">
                    Lv. {level}
                  </span>
                </div>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-800 p-0.5 border border-slate-700/50">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AttributeSection;