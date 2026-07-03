import { Check } from "lucide-react";

function Checkbox({ checked, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                checked
                    ? "bg-blue-600 border-blue-600"
                    : "border-zinc-700"
            }`}
        >
            {checked && <Check size={18} />}
        </button>
    );
}

export default Checkbox;