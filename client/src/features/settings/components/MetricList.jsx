import MetricItem from "./MetricItem";

function MetricList({
    metrics,
    onEdit,
    onDelete,
}) {
    return (
        <div>

            {metrics.map(metric => (

                <MetricItem

                    key={metric._id}

                    metric={metric}

                    onEdit={onEdit}

                    onDelete={onDelete}

                />

            ))}

        </div>
    );
}

export default MetricList;