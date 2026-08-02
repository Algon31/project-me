import { Check } from "lucide-react";

function Checkbox({ checked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
        checked
          ? "border-emerald-500 bg-emerald-500 text-white scale-105 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          : "border-slate-700 bg-slate-950 text-transparent hover:border-indigo-500 hover:bg-slate-900"
      }`}
    >
      <Check size={22} className={checked ? "stroke-[3]" : "opacity-0"} />
    </button>
  );
}

export default Checkbox;