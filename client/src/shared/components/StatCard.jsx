function StatCard({
    title,
    value,
    icon,
    subtitle,
}) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-[var(--border)]
                bg-white
                p-4
                transition-all
                duration-200
                hover:border-[var(--pcolor)]
            "
        >
            <div className="mb-6 flex items-center justify-between">

                <div>

                    <p className="text-sm text-[var(--muted)]">
                        {title}
                    </p>

                    {subtitle && (
                        <p className="mt-1 text-xs text-[var(--muted)]">
                            {subtitle}
                        </p>
                    )}

                </div>

                <div className="rounded-xl bg-[var(--bg)] p-3 text-[var(--pcolor)]">
                    {icon}
                </div>

            </div>

            <h2 className="text-4xl font-bold tracking-tight">
                {value}
            </h2>

        </div>
    );
}

export default StatCard;