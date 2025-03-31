import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CGPAChart = ({ data }) => {
    const chartData = data.map(c => ({
        name: c._id, avgCGPA: c.avgCGPA
    }));

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Average CGPA per Branch</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgCGPA" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CGPAChart;
