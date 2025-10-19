import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00FFFF", "#FF00FF", "#FFFF00", "#FF007A", "#00D4FF"];
  
// 1. Gender Distribution (Pie Chart)
const GenderChart = ({ data }) => {
  const chartData = data.map((g) => ({ name: g._id, value: g.count }));

  return (
    <div className="p-6 bg-gray-900 border border-cyan-500 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-cyan-400 text-center mb-4">Gender Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #00FFFF" }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
  
// 2. Students by Branch (Bar Chart)
const BranchChart = ({ data }) => {
  const chartData = data.map((b) => ({ name: b._id, count: b.count }));

  return (
    <div className="p-6 bg-gray-900 border border-purple-500 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-purple-400 text-center mb-4">Students by Branch</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #FF00FF" }} />
          <Bar dataKey="count" fill="#FF00FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
  
// 3. CGPA by Branch (Radar Chart)
const CGPAStatsChart = ({ data }) => {
  const chartData = data.map((stats) => ({
    branch: stats._id,
    avgCGPA: stats.avgCGPA,
    maxCGPA: stats.maxCGPA,
    minCGPA: stats.minCGPA,
  }));

  return (
    <div className="p-6 bg-gray-900 border border-yellow-500 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-yellow-400 text-center mb-4">CGPA by Branch</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="#fff" />
          <PolarAngleAxis dataKey="branch" stroke="#fff" />
          <Radar name="Avg" dataKey="avgCGPA" stroke="#00FFFF" fill="#00FFFF" fillOpacity={0.5} />
          <Radar name="Max" dataKey="maxCGPA" stroke="#FF00FF" fill="#FF00FF" fillOpacity={0.5} />
          <Radar name="Min" dataKey="minCGPA" stroke="#FFFF00" fill="#FFFF00" fillOpacity={0.5} />
          <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #FFFF00" }} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
  
// 4. Top Districts (Horizontal Bar Chart)
const DistrictChart = ({ data }) => {
  const chartData = data
    .filter(d => d.count >= 5)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map(d => ({ name: d._id, value: d.count }));

  return (
    <div className="p-6 bg-gray-900 border border-orange-500 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-orange-400 text-center mb-4">Top Districts</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical">
          <XAxis type="number" stroke="#fff" />
          <YAxis dataKey="name" type="category" stroke="#fff" width={80} />
          <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #FF8C00" }} />
          <Bar dataKey="value" fill="#FF8C00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
  
// 5. Students by Caste (Donut Chart)
const CasteChart = ({ data }) => {
  const chartData = data.map((c) => ({ name: c._id, value: c.count }));

  return (
    <div className="p-6 bg-gray-900 border border-pink-500 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-pink-400 text-center mb-4">Students by Caste</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #FF007A" }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};// 6. Average CGPA Trend (Line Chart)
const AvgCGPAByBranchChart = ({ data }) => {
  const chartData = data.map((b) => ({ name: b._id, avgCGPA: b.avgCGPA }));

  return (
    <div className="p-6 bg-gray-900 border border-blue-500 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-blue-400 text-center mb-4">Average CGPA by Branch</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #00FFFF" }} />
          <Line type="monotone" dataKey="avgCGPA" stroke="#00FFFF" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export {
  GenderChart,
  BranchChart,
  CGPAStatsChart,
  DistrictChart,
  CasteChart,
  AvgCGPAByBranchChart,
};