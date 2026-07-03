import MetricCard from "./MetricCard";

function NumberMetric({ metric, onChange }) {
    return (
        <MetricCard title={metric.name}>
            <input
                type="number"
                value={metric.value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="border rounded p-2 w-full"
            />
        </MetricCard>
    );
}

export default NumberMetric;