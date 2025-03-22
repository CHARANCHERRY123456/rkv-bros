import { useState } from "react";
import { Folder, FileText, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const subjects = [
  {
    id: 1,
    name: "Deep Learning",
    children: [
      {
        id: 11,
        name: "Assignments",
        children: [
          {
            id: 111,
            name: "Week 8",
            children: [
              { id: 1111, name: "Question 1" },
              { id: 1112, name: "Question 2" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "OOSD",
    children: [
      {
        id: 21,
        name: "Assignments",
        children: [
          {
            id: 211,
            name: "Week 8",
            children: [
              { id: 2111, name: "Question 1" },
              { id: 2112, name: "Question 2" },
            ],
          },
        ],
      },
    ],
  },
];

export default function FolderStructure() {
  const [currentView, setCurrentView] = useState({ level: 0, items: subjects, history: [] });

  const openFolder = (folder) => {
    if (folder.children) {
      setCurrentView((prev) => ({
        level: prev.level + 1,
        items: folder.children,
        history: [...prev.history, prev.items],
      }));
    }
  };

  const goBack = () => {
    setCurrentView((prev) => {
      const history = [...prev.history];
      const prevItems = history.pop();
      return { level: prev.level - 1, items: prevItems, history };
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">NPTEL Assignments</h2>

      {currentView.level > 0 && (
        <button onClick={goBack} className="flex items-center space-x-2 mb-4 text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      )}

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {currentView.items.map((item) => (
          <motion.div
            key={item.id}
            className="cursor-pointer flex flex-col items-center space-y-2"
            whileHover={{ scale: 1.05 }}
            onClick={() => openFolder(item)}
          >
            {item.children ? (
              <Folder className="w-12 h-12 text-yellow-500" />
            ) : (
              <FileText className="w-12 h-12 text-blue-500" />
            )}
            <span className="text-sm text-gray-700">{item.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
