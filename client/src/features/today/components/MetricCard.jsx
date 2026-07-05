import Card from "../../../shared/components/Card";

function MetricCard({
    title,
    description,
    children,
}) {
    return (

        <Card className="mb-5 p-6 rounded-2xl">

            <div className="flex items-center justify-between gap-8">

                <div>

                    <h2 className="text-lg font-semibold space-y-1">

                        {title}

                    </h2>

                    <p className="text-sm text-[var(--muted)] mt-1 space-y-1">

                        {description}

                    </p>

                </div>

                {children}

            </div>

        </Card>

    );
}

export default MetricCard;