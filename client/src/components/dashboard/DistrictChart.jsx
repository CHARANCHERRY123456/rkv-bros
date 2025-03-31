import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF69B4", "#32CD32", "#FFD700"];

const DistrictPieChart = ({ data }) => {
    const chartData = data.map(d => ({ name: d._id, value: d.count }));

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Student Count per District</h2>
            <PieChart width={400} height={400}>
                <Pie 
                    data={chartData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={120} 
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default DistrictPieChart;
