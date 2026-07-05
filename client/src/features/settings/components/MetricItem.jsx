import Card from "../../../shared/components/Card";
import Button from "../../../shared/components/Button";

function MetricItem({ metric, onEdit, onDelete }) {
  return (
    <Card className="mb-5">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {metric.name}
          </h2>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="font-medium">
                Type:
              </span>{" "}
              <span className="capitalize">{metric.type}</span>
            </p>

            <p>
              <span className="font-medium">
                Score:
              </span>{" "}
              {metric.weight} Points
            </p>
          </div>
        </div>

        <div
          className="
            flex
            flex-col
            gap-3
            md:flex-row
          "
        >
          <Button
            className="w-full md:w-auto px-5"
            onClick={() => onEdit(metric)}
          >
            Edit
          </Button>

          <button
            onClick={() => onDelete(metric._id)}
            className="
              w-full
              md:w-auto
              rounded-xl
              border
              border-red-300
              px-5
              py-3
              text-red-600
              transition-colors
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