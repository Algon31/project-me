function StatCard({
    title,
    value,
    icon,
}) {
    return (
        <div className="
            bg-[var(--card)]
            border
            border-[var(--border)]
            rounded-2xl
            p-6
        ">

            <div className="flex justify-between items-center mb-4">

                <p className="text-sm text-[var(--muted)]">

                    {title}

                </p>

                {icon}

            </div>

            <h2 className="text-4xl font-bold">

                {value}

            </h2>

        </div>
    );
}

export default StatCard;