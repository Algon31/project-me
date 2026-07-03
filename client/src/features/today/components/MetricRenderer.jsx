import CheckboxMetric from "./CheckboxMetric";
import NumberMetric from "./NumberMetric";
import TextMetric from "./TextMetric";

function MetricRenderer({ metric, onChange }) {
    switch (metric.type) {
        case "checkbox":
            return (
                <CheckboxMetric
                    metric={metric}
                    onChange={onChange}
                />
            );

        case "number":
            return (
                <NumberMetric
                    metric={metric}
                    onChange={onChange}
                />
            );

        case "text":
            return (
                <TextMetric
                    metric={metric}
                    onChange={onChange}
                />
            );

        default:
            return null;
    }
}

export default MetricRenderer;