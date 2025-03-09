import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentSearch = () => {
    const [input, setInput] = useState(""); // Stores input value
    const [suggestions, setSuggestions] = useState([]); // Stores suggestions (student names)
    const [selectedStudent, setSelectedStudent] = useState(null); // Stores selected student details

    useEffect(() => {
        const fetchStudentNames = async () => {
            try {
              const response = await axios.get("http://localhost:3000/student/");
              const names = response.data.map((item) => item.name);
              setSuggestions(names);              
            } catch (error) {
                console.error("Error fetching names:", error);
            }
        };
        fetchStudentNames();
    }, []);

    // ✅ Handle input change & filter suggestions
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    // ✅ Handle selecting a name from suggestions
    const handleSelectSuggestion = async (name) => {
        setInput(name); // Set input to selected name
        setSuggestions([]); // Hide suggestions

        // Fetch full student details from backend
        try {
            const response = await axios.get(`http://localhost:3000/student/filter?name=${name}`);
            console.log(response.data);
            setSelectedStudent(response.data); // Assuming backend returns full student details
        } catch (error) {
            console.error("Error fetching student details:", error);
        }
    };

    return (
        <div>
            {/* 🔍 Search Input */}
            <input
                type="text"
                placeholder="Search student name..."
                value={input}
                onChange={handleInputChange}
            />
            {/* 📌 Display Suggestions */}
            {input && (
                <ul>
                    {suggestions
                        .filter((name) => name.toLowerCase().includes(input.toLowerCase())) 
                        .map((name, index) => (
                            <li key={index} onClick={() => handleSelectSuggestion(name)}>
                                {name}
                            </li>
                        ))}
                </ul>
            )}

            {/* 📝 Display Student Details */}
            {selectedStudent && (
                <div>
                    {selectedStudent.map((student , index) => (
                          <div key={index}>
                              <h2>{student.name}</h2>
                              <p>Batch: {student.batch}</p>
                              <p>sid: {student.sid}</p>
                              <p>name: {student.name}</p>
                          </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentSearch;
