import { useEffect, useState } from "react";
import axios from 'axios';
import envVars from "../../../config/config.js";
import LoadingSpinner from "../shared/LoadingSpinner.jsx";

export default function Content() {
    const [assignments, setAssignments] = useState([]);
    const [loading , setLoading] = useState(false);
    const backendUrl = envVars.VITE_BASE_URL;

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${backendUrl}/assignments`);
                setAssignments(response.data);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            }finally{
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Assignments</h1>
            
            {loading && <LoadingSpinner />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignments.map((assignment, index) => (
                    <a
                        key={assignment._id || index}
                        href={`/assignments/${assignment.assignmentName}`}
                        className="block bg-white rounded-lg shadow-md overflow-hidden
                         transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1 border border-gray-200"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {assignment.assignmentName}
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                {assignment.description || "No description available"}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                    {assignment.dueDate || "No due date"}
                                </span>
                                <span className="text-xs text-gray-500">
                                    Click to open
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}