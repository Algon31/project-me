import MetricCard from "./MetricCard";

function TextMetric({ metric, onChange }) {
    return (
        <MetricCard title={metric.name}>
            <textarea
                rows="4"
                value={metric.value}
                onChange={(e) => onChange(e.target.value)}
                className="border rounded p-2 w-full"
            />
        </MetricCard>
    );
}

export default TextMetric;