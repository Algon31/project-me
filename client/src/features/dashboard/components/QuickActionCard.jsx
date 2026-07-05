import { Link } from "react-router-dom";

function QuickActionCard({
    title,
    description,
    icon,
    to,
}) {
    return (
        <Link
            to={to}
            className="
                flex
                items-start
                gap-5
                rounded-2xl
                border
                border-[var(--border)]
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-md
                hover:border-[var(--pcolor)]
            "
        >
            <div
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--bg)]
                    text-[var(--pcolor)]
                    flex-shrink-0
                "
            >
                {icon}
            </div>

            <div className="flex-1">

                <h2 className="text-lg font-semibold">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                    {description}
                </p>

            </div>
        </Link>
    );
}

export default QuickActionCard;