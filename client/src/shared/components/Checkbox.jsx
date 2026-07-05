import { Check } from "lucide-react";

function Checkbox({
    checked,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className={`
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-md
                border
                transition-colors

                ${
                    checked
                        ? "bg-[var(--pcolor)] border-[var(--pcolor)] text-white"
                        : "bg-white border-[var(--border)]"
                }
            `}
        >
            {checked && <Check size={16} />}
        </button>
    );
}

export default Checkbox;