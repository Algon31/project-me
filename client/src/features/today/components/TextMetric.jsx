import MetricCard from "./MetricCard";
import Textarea from "../../../shared/components/Textarea";

function TextMetric({
    metric,
    onChange,
}) {
    return (

        <MetricCard
            title={metric.name}
            description="Write something..."
        >

            <div className="w-72">

                <Textarea
                    value={metric.value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    rows={3}
                />

            </div>

        </MetricCard>

    );
}

export default TextMetric;