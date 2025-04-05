import {
    Treemap,
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    LineChart,
    CartesianGrid,
    Line,
    LabelList,
    ResponsiveContainer,
  } from "recharts";
  
  // Neon color palette
  const COLORS = ["#00FFFF", "#FF00FF", "#FFFF00", "#FF007A", "#00D4FF"];
  
  // 1. GenderChart (Pie Chart)
  const GenderChart = ({ data }) => {
    const chartData = data.map((g) => ({ name: g._id, value: g.count }));
  
    return (
      <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500 rounded-lg shadow-lg shadow-cyan-500/50">
        <h2 className="text-lg sm:text-xl font-bold text-cyan-400 text-center mb-4">Gender Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
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
              contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #00FFFF", color: "#fff" }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // 2. BranchChart (Bar Chart)
  const BranchChart = ({ data }) => {
    const chartData = data.map((b) => ({ name: b._id, count: b.count }));
  
    return (
      <div className="p-4 sm:p-6 bg-gray-900 border border-purple-500 rounded-lg shadow-lg shadow-purple-500/50">
        <h2 className="text-lg sm:text-xl font-bold text-purple-400 text-center mb-4">Students by Branch</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #FF00FF", color: "#fff" }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
            <Bar dataKey="count" fill="#FF00FF" barSize={20} className="animate-[grow_1s_ease-out]" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // 3. CGPAStatsChart (Radar Chart)
  const CGPAStatsChart = ({ data }) => {
    const chartData = data.map((stats) => ({
      branch: stats._id,
      avgCGPA: stats.avgCGPA,
      maxCGPA: stats.maxCGPA,
      minCGPA: stats.minCGPA,
    }));
  
    return (
      <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-yellow-500 rounded-lg shadow-lg shadow-yellow-500/50">
        <h2 className="text-lg sm:text-xl font-bold text-yellow-400 text-center mb-4">CGPA Analytics by Branch</h2>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData}>
            <PolarGrid stroke="#fff" />
            <PolarAngleAxis dataKey="branch" stroke="#fff" />
            <Radar
              name="Avg CGPA"
              dataKey="avgCGPA"
              stroke="#00FFFF"
              fill="#00FFFF"
              fillOpacity={0.6}
            />
            <Radar
              name="Max CGPA"
              dataKey="maxCGPA"
              stroke="#FF00FF"
              fill="#FF00FF"
              fillOpacity={0.6}
            />
            <Radar
              name="Min CGPA"
              dataKey="minCGPA"
              stroke="#FFFF00"
              fill="#FFFF00"
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #FFFF00", color: "#fff" }}
            />
            <Legend wrapperStyle={{ color: "#" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // 4. DistrictChart (Horizontal Bar Chart)


const DistrictChart = ({ data }) => {
  // Filter districts with count >= 5
  const filteredData = data.filter(d => d.count >= 5);

  // Sort by count descending
  const chartData = filteredData
    .sort((a, b) => b.count - a.count)
    .map(d => ({ name: d._id, value: d.count }));

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-yellow-500 rounded-lg shadow-lg shadow-yellow-400/40">
      <h2 className="text-lg sm:text-xl font-bold text-yellow-300 text-center mb-4"> District-wise Heatmap (Top Districts Only)</h2>
      <ResponsiveContainer width="100%" height={50 + chartData.length * 40}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 40, left: 80, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis type="number" stroke="#fff" />
          <YAxis
            dataKey="name"
            type="category"
            stroke="#fff"
            width={100}
            tick={{ fill: "#fff", fontSize: 14 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f1f1f", border: "1px solid #FFD700", color: "white" }}
            formatter={(value) => [`${value} students`, "Count"]}
          />
          <Bar dataKey="value" barSize={24}>
            <LabelList dataKey="value" position="right" fill="#fff" fontSize={14} />
            {chartData.map((entry, index) => {
              // Heat color scaling
              const intensity = Math.min(entry.value / chartData[0].value, 1);
              const hue = 35; // warm orange tone
              const lightness = 75 - intensity * 45;
              return (
                <Cell key={`cell-${index}`} fill={`hsl(${hue}, 100%, ${lightness}%)`} />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


  
  
  
  // 5. CasteChart (Donut Chart)
  const CasteChart = ({ data }) => {
    const chartData = data.map((c) => ({ name: c._id, value: c.count }));
  
    return (
      <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-pink-500 rounded-lg shadow-lg shadow-pink-500/50">
        <h2 className="text-lg sm:text-xl font-bold text-pink-400 text-center mb-4">Students by Caste</h2>
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:scale-105 transition-transform duration-200"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #FF007A", color: "#fff" }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // 6. AvgCGPAByBranchChart (Line Chart)
  const AvgCGPAByBranchChart = ({ data }) => {
    const chartData = data.map((b) => ({ name: b._id, avgCGPA: b.avgCGPA }));
  
    return (
      <div className="p-4 sm:p-6 bg-gray-900 border border-blue-500 rounded-lg shadow-lg shadow-blue-500/50">
        <h2 className="text-lg sm:text-xl font-bold text-blue-400 text-center mb-4">Avg CGPA by Branch</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #00FFFF", color: "#fff" }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
            <Line
              type="monotone"
              dataKey="avgCGPA"
              stroke="#00FFFF"
              strokeWidth={3}
              dot={{ r: 5, fill: "#00FFFF" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Export all components
  export {
    GenderChart,
    BranchChart,
    CGPAStatsChart,
    DistrictChart,
    CasteChart,
    AvgCGPAByBranchChart,
  };