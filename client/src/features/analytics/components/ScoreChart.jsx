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
        <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />

        <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />

        <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />

        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            borderColor: "#334155",
            borderRadius: "12px",
            color: "#f8fafc",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
          }}
          itemStyle={{ color: "#818cf8" }}
        />

        <Line
          type="monotone"
          dataKey="xp"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 4, fill: "#6366f1", strokeWidth: 2, stroke: "#0f172a" }}
          activeDot={{ r: 7, fill: "#818cf8" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ScoreChart;