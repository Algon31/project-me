import Card from "../../../shared/components/Card";
import { Check, Circle } from "lucide-react";

function GoalList({ metrics = [] }) {

    return (

        <Card>

            <h2 className="mb-6 text-2xl font-semibold">

                Today's Goals

            </h2>

            <div className="space-y-4">

                {metrics.map(metric => (

                    <div
                        key={metric.metric._id}
                        className="flex items-center gap-4"
                    >

                        {metric.value ? (

                            <Check
                                className="text-green-600"
                                size={20}
                            />

                        ) : (

                            <Circle
                                className="text-gray-400"
                                size={20}
                            />

                        )}

                        <span>

                            {metric.metric.name}

                        </span>

                    </div>

                ))}

            </div>

        </Card>

    );

}

export default GoalList;