import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Check } from "lucide-react";

const data = [
  "Apple",
  "Banana",
  "Cherry",
  "Dragon Fruit",
  "Grapes",
  "Kiwi",
  "Mango",
  "Orange",
  "Peach",
  "Pineapple",
  "Strawberry",
  "Watermelon",
];

export default function AutoComplete() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
    } else {
      const results = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(results);
    }
    setSelectedIndex(-1);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setSelectedItem(filtered[selectedIndex]);
      setQuery(filtered[selectedIndex]);
      setFiltered([]);
    } else if (e.key === "Escape") {
      setFiltered([]);
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setQuery(item);
    setFiltered([]);
    inputRef.current.focus();
  };

  return (
    <div className="relative w-80 mx-auto">
      <div className="flex items-center gap-2 border p-2 rounded-lg shadow-md bg-white">
        <Search className="text-gray-500" size={18} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a fruit..."
          className="w-full outline-none"
        />
      </div>

      {filtered.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-0 mt-2 w-full bg-white border shadow-lg rounded-lg overflow-hidden z-10"
        >
          {filtered.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className={`flex items-center justify-between p-2 cursor-pointer ${
                selectedIndex === index ? "bg-gray-100" : ""
              } hover:bg-gray-200`}
            >
              {item}
              {selectedItem === item && <Check className="text-green-500" size={18} />}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
