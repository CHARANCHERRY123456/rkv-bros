import React, { useState, useEffect } from "react";
import studentData from "./od.json";

const Trending = () => {
  const [students, setStudents] = useState([]);
  const [sortKey, setSortKey] = useState("total");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const sorted = [...studentData].sort((a, b) => a.total_rank - b.total_rank);
    setStudents(sorted);
  }, []);

  const handleSort = (key) => {
    let sorted = [];
    if (key === "total") {
      sorted = [...studentData].sort((a, b) => a.total_rank - b.total_rank);
    } else if (key === "ooad") {
      sorted = [...studentData]
        .filter((s) => s.OOAD_TOTAL !== "")
        .sort((a, b) => b.OOAD_TOTAL - a.OOAD_TOTAL);
    } else if (key === "dl") {
      sorted = [...studentData]
        .filter((s) => s.DL_TOTAL !== "")
        .sort((a, b) => b.DL_TOTAL - a.DL_TOTAL);
    }
    setSortKey(key);
    setStudents(sorted);
  };

  const filteredStudents = students.filter((student) =>
    student.NAME.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
        Student Rankings
      </h1>

      {/* Search and Sort controls centered */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center mb-6">
        <input
          type="search"
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={sortKey}
          onChange={(e) => handleSort(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="total">Sort by Total Rank</option>
          <option value="ooad">Sort by OOAD Score</option>
          <option value="dl">Sort by DL Score</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Rank</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">OOAD</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">DL</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s, index) => (
                <tr
                  key={s.ID}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4">{sortKey === "total" ? s.total_rank : index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{s.NAME}</td>
                  <td className="py-3 px-4">{s.ID}</td>
                  <td className="py-3 px-4">{s.OOAD_TOTAL || "N/A"}</td>
                  <td className="py-3 px-4">{s.DL_TOTAL || "N/A"}</td>
                  <td className="py-3 px-4">{s.TOTAL_MARKS}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500 italic">
                  No students found matching "{searchText}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trending;

