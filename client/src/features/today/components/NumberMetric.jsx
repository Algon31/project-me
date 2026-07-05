import MetricCard from "./MetricCard";

function NumberMetric({
    metric,
    onChange,
}) {
    return (

        <MetricCard
            title={metric.name}
            description="Today's Value"
        >

            <div className="flex items-center gap-3">

                <button
                    onClick={() =>
                        onChange(Math.max(0, metric.value - 1))
                    }
                    className="h-10 w-10 rounded-lg border border-[var(--border)] bg-white"
                >
                    −
                </button>

                <span className="w-10 text-center text-xl font-bold">

                    {metric.value}

                </span>

                <button
                    onClick={() =>
                        onChange(metric.value + 1)
                    }
                    className="h-10 w-10 rounded-lg border border-[var(--border)] bg-white"
                >
                    +
                </button>

            </div>

        </MetricCard>

    );
}

export default NumberMetric;