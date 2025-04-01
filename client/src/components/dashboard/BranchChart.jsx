// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const BranchChart = ({ data }) => {
//     const chartData = data.map(b => ({ name: b._id, value: b.count }));

//     return (
//         <div className="p-4 border rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">Branch Distribution</h2>
//             <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={chartData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" fill="#82ca9d" />
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default BranchChart;


import { BarChart, Bar, XAxis,Cell, YAxis, Tooltip, Legend,ResponsiveContainer } from "recharts";


const BranchChart = ({ data }) => {
  const chartData = data.map((b) => ({ name: b._id, count: b.count }));

  return (
    <div className="p-4 bg-gray-900 border border-purple-500 rounded-lg shadow-md shadow-purple-500/50">
      <h2 className="text-xl font-bold text-purple-400 text-center mb-4">Students by Branch</h2>
        <ResponsiveContainer width={"100%"} height={300}>
            <BarChart width={500} height={300} data={chartData}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #FF00FF", color: "#fff" }}
                />
                <Legend wrapperStyle={{ color: "#fff" }} />
                <Bar
                dataKey="count"
                fill="#FF00FF"
                barSize={30}
                className="animate-[grow_1s_ease-out]"
                >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#FF00FF" />
                ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default BranchChart;