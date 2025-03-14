import { useState, useEffect } from "react";
import axios from "axios";
import envVars from "../../../config/config.js";
import SearchInput from "./searchInput.jsx";
import StudentList from "./gridLayout.jsx";

export default function StudentComponentPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Load results from sessionStorage on mount
  useEffect(() => {
    const storedResults = sessionStorage.getItem("searchResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
      setSearchPerformed(true);
    }
  }, []);

  const handleSearch = async (input) => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      const response = await axios.get(
        `${envVars.VITE_BASE_URL}/student/filter?name=${input}`
      );
      setResults(response.data);
      sessionStorage.setItem("searchResults", JSON.stringify(response.data)); // Store results
    } catch (err) {
      console.error(`Error fetching results: ${err.message}`);
      setError("Failed to fetch results. Please try again.");
      setResults([]);
      sessionStorage.removeItem("searchResults"); // Clear stored results on error
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResults([]);
    setSearchPerformed(false);
    setError(null);
    sessionStorage.removeItem("searchResults"); // Clear results from sessionStorage
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Search Box */}
      <div className="w-full max-w-2xl">
        <SearchInput onSearch={handleSearch} onClear={handleClear} />
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

      {/* Student List */}
      <div className="w-full max-w-6xl">
        {results.length > 0 && <StudentList students={results} />}
      </div>
    </div>
  );
}
