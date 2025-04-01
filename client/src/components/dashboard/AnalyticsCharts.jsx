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
    Line,
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
    const chartData = data.map((d) => ({ name: d._id, value: d.count }));
  
    return (
      <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500 rounded-lg shadow-lg shadow-green-500/50">
        <h2 className="text-lg sm:text-xl font-bold text-green-400 text-center mb-4">Students by District</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="horizontal" margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <XAxis dataKey="name" stroke="#fff" angle={-45} textAnchor="end" height={100} interval={0} />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #00FF00", color: "#fff" }}
              formatter={(value, name) => [`${value} students`, name]}
            />
            <Bar dataKey="value" barSize={20}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(${index * 360 / chartData.length}, 70%, 50%)`} // Dynamic HSL colors
                  className="hover:scale-105 transition-transform duration-200"
                />
              ))}
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
  
  // 6. BestStreamCard (Custom Card)
  const BestStreamCard = ({ data }) => {
    return (
      <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-yellow-500 rounded-lg shadow-lg shadow-yellow-500/50 text-center">
        <div className="text-3xl sm:text-4xl text-yellow-400 mb-4 animate-pulse">🏆</div>
        <h2 className="text-lg sm:text-xl font-bold text-yellow-400">Top Stream: {data?._id}</h2>
        <p className="text-base sm:text-lg text-white">Avg CGPA: {data?.avgCGPA.toFixed(2)}</p>
      </div>
    );
  };
  
  // 7. AvgCGPAByBranchChart (Line Chart)
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
    BestStreamCard,
    AvgCGPAByBranchChart,
  };