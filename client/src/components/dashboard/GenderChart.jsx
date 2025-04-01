import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#00FFFF", "#FF00FF", "#FFFF00"]; // Neon cyan, magenta, yellow

const GenderChart = ({ data }) => {
  const chartData = data.map((g) => ({ name: g._id, value: g.count }));

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500 rounded-lg shadow-lg shadow-cyan-500/50">
      <h2 className="text-xl font-bold text-cyan-400 text-center mb-4">Gender Distribution</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
          labelLine={true}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              className="hover:scale-105 transition-transform duration-200"
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "white", border: "1px solid #00FFFF", color: "#fff" }}
        />
        <Legend wrapperStyle={{ color: "#fff" }} />
      </PieChart>
    </div>
  );
};

export default GenderChart;