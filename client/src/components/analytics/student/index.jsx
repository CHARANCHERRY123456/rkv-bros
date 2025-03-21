import { useEffect, useState } from "react";
import axios from 'axios';
import envVars from '../../../config/config.js';
import StudentList from "./gridLayout.jsx";
import SearchInput from "./searchInput.jsx";
import { toast } from "react-hot-toast";
export default function StudentComponentPage(){
  const [students , setStudents] = useState([]);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(null);

  // to search the result
  const handleSearch = async(input)=>{
      if (!input.trim()) return;
      setLoading(true);

      try {
        const result = await axios.get(`${envVars.VITE_BASE_URL}/student/filter?q=${input}`);
        setStudents(result.data);
        // sores the result in the session storage and get when come again
        sessionStorage.setItem("searchedStudents" , JSON.stringify(result.data));
      } catch (error) {
        toast("Error while fetching the data");
        console.error(`Error while fetching the data ${error.message}`);
        setError("Error fetching the data please try again");
        setStudents([]);
        sessionStorage.removeItem("searchedStudents");
      }finally{
        setLoading(false);
      }
  }

  useEffect(() => {
    const storedResults = sessionStorage.getItem("searchedStudents");
    if (storedResults) {
      setStudents(JSON.parse(storedResults)); // Parse before setting state
    }
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

      {/* Search Box */}
      <div className="w-full max-w-2xl">
        <SearchInput onSearch={handleSearch}/>
      </div>

      {/* Loading & Error Messages */}
      {loading && (
        <div className="text-center text-blue-600 font-semibold my-4">
          Loading...
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 font-semibold my-4">
          {error}
        </div>
      )}

    <div className="w-full max-w-6xl">
      {students.length > 0 && <StudentList students={students} />}
    </div>
   </div>

  )
}