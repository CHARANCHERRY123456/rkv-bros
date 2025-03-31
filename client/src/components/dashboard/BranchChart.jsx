import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BranchChart = ({ data }) => {
    const chartData = data.map(b => ({ name: b._id, value: b.count }));

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Branch Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BranchChart;
