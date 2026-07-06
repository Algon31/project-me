import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
 YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ScoreChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <CartesianGrid stroke="#DDD8C8" strokeDasharray="5 5" />

        <XAxis dataKey="date" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="xp"
          stroke="#B75A48"
          strokeWidth={4}
          dot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ScoreChart;