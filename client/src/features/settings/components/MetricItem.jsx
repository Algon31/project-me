function MetricItem({ metric }) {
    return (
        <div className="flex items-center justify-between border rounded-lg p-4">

            <div>
                <h3 className="font-semibold">{metric.name}</h3>

                <p className="text-sm text-gray-500">
                    {metric.type}
                </p>
            </div>

            <div className="space-x-2">

                <button>Edit</button>

                <button>Delete</button>

            </div>

        </div>
    );
}

export default MetricItem;