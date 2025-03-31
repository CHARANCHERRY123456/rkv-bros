import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF69B4", "#32CD32", "#FFD700"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  // Only show label if segment is large enough
  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DistrictPieChart = ({ data }) => {
    const chartData = data.map(d => ({ name: d._id, value: d.count }));
    
    // Sort data by value descending to put largest segments at top
    const sortedData = [...chartData].sort((a, b) => b.value - a.value);

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Student Count per District</h2>
            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={sortedData} 
                            dataKey="value" 
                            nameKey="name" 
                            cx="50%" 
                            cy="50%" 
                            outerRadius={120}
                            innerRadius={60}
                            fill="#8884d8"
                            label={renderCustomizedLabel}
                            labelLine={false}
                            paddingAngle={2} // Add small gap between segments
                        >
                            {sortedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            formatter={(value, name, props) => [
                                value, 
                                name
                            ]}
                        />
                        <Legend 
                            layout="vertical" 
                            verticalAlign="middle" 
                            align="right"
                            wrapperStyle={{
                                paddingLeft: '20px'
                            }}
                            formatter={(value, entry, index) => {
                                const percent = (sortedData[index]?.value / sortedData.reduce((sum, item) => sum + item.value, 0)) * 100;
                                return `${value} (${percent.toFixed(1)}%)`;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DistrictPieChart;