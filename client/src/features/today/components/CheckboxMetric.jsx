import MetricCard from "./MetricCard";

function CheckboxMetric({ metric, onChange }) {
    return (
        <MetricCard title={metric.name}>
            <label className="flex items-center gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    checked={metric.value}
                    onChange={(e) => onChange(e.target.checked)}
                />

                <span>Completed</span>
            </label>
        </MetricCard>
    );
}

export default CheckboxMetric;