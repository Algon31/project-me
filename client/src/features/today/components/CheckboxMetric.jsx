import Checkbox from "../../../shared/components/Checkbox";
import MetricCard from "./MetricCard";

function CheckboxMetric({ metric, onChange }) {
  return (
    <MetricCard title={metric.name} description="Completed Today">
      <Checkbox
        className="
h-12
w-12
rounded-xl
bg-[var(--pcolor)]
text-white
"
        checked={metric.value}
        onClick={() => onChange(!metric.value)}
      />
    </MetricCard>
  );
}

export default CheckboxMetric;
