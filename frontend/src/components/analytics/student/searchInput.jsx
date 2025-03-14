import { useState } from "react"

const SearchInput = ({ onSearch, onClear }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("in the enter key");
      onSearch(input);
    }
  };

  return (
    <div className="mb-6 w-full max-w-xl mx-auto">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by name,id,phone etc"
          className="w-full p-4 border rounded-lg shadow-sm 
                     focus:ring focus:ring-blue-200 focus:border-blue-300 
                     transition-shadow pr-12 bg-white text-gray-700 
                     placeholder-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Use an arrow function to avoid immediate execution */}
        <button
          onClick={() => onSearch(input)}
          className="absolute bg-[#334155] rounded inset-y-0 right-0 
                     flex items-center pr-3 pl-3"
        >
          <svg
            className="h-6 w-6 text-gray-200 hover:text-gray-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
