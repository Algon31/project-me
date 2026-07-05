import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function CompletionChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="#DDD8C8" strokeDasharray="5 5" />

        <XAxis
          dataKey="date"
          tick={{
            fontSize: 12,
          }}
        />

        <YAxis />

        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #DDD8C8",
          }}
        />

        <Line
          type="monotone"
          dataKey="completion"
          stroke="#B75A48"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CompletionChart;
