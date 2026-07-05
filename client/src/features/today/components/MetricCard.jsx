import Card from "../../../shared/components/Card";

function MetricCard({
    title,
    description,
    children,
}) {
    return (
        <Card className="mb-5 p-6 rounded-2xl">
            <div
                className="
                    flex
                    flex-col
                    gap-6
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >
                <div>
                    <h2 className="text-lg font-semibold">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-[var(--muted)]">
                        {description}
                    </p>
                </div>

                {children}
            </div>
        </Card>
    );
}

export default MetricCard;