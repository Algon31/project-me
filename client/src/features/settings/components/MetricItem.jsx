import Card from "../../../shared/components/Card";
import Button from "../../../shared/components/Button";
import Badge from "../../../shared/components/Badge";

function MetricItem({
    metric,
    onEdit,
    onDelete,
}) {
    return (
        <Card className="mb-5">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-semibold">
                        {metric.name}
                    </h2>

                    <div className="mt-3 flex gap-2">

                        <Badge>
                            {metric.type}
                        </Badge>

                        <Badge>
                            Weight : {metric.weight}
                        </Badge>

                    </div>

                </div>

                <div className="flex gap-3">

                    <Button
                        className="w-auto px-5"
                        onClick={() => onEdit(metric)}
                    >
                        Edit
                    </Button>

                    <button
                        onClick={() => onDelete(metric._id)}
                        className="
                            rounded-xl
                            border
                            border-red-300
                            px-5
                            py-3
                            text-red-600
                            hover:bg-red-50
                        "
                    >
                        Delete
                    </button>

                </div>

            </div>

        </Card>
    );
}

export default MetricItem;