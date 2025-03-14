import { useState } from "react";
import axios from "axios";
import envVars from "../../../config/config.js";
import SearchInput from "./searchInput.jsx";
import StudentResult from "./StudentResult.jsx";

export default function StudentComponentPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (input) => {
    if (!input.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      const response = await axios.get(
        `${envVars.VITE_BASE_URL}/student/filter?name=${input}`
      );
      setResults(response.data);
    } catch (err) {
      console.error(`Error fetching results: ${err.message}`);
      setError("Failed to fetch results. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResults([]);
    setSearchPerformed(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <SearchInput onSearch={handleSearch} onClear={handleClear} />

        {loading && (
          <div className="text-center text-blue-600 font-semibold mb-4">
            Loading...
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 font-semibold mb-4">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((user) => (
              <StudentResult key={user.id} user={user} />
            ))}
          </div>
        )}


      </div>
    </div>
  );
}