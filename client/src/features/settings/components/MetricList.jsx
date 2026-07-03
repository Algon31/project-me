import MetricItem from "./MetricItem";

function MetricList({ metrics }) {
    return (
        <div className="space-y-4">
            {metrics.map(metric => (
                <MetricItem
                    key={metric._id}
                    metric={metric}
                />
            ))}
        </div>
    );
}

export default MetricList;