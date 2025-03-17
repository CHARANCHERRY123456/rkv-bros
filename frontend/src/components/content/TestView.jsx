import React, { useState } from "react";

const TestView = ({ folder, onBack, onTestClick, onAddTest, onRenameTest }) => {
  const [newTestName, setNewTestName] = useState("");

  return (
    <div>
      <h2>Tests in {folder.name}</h2>
      <button onClick={onBack}>Back to Folders</button>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {folder.tests.map((test) => (
          <div
            key={test.id}
            onClick={() => onTestClick(test)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              cursor: "pointer",
              width: "150px",
              textAlign: "center",
            }}
          >
            <p>{test.name}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const newName = prompt("Rename test:", test.name);
                if (newName) onRenameTest(test.id, newName);
              }}
            >
              Rename
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="New Test Name"
          value={newTestName}
          onChange={(e) => setNewTestName(e.target.value)}
        />
        <button
          onClick={() => {
            if (newTestName.trim()) {
              onAddTest(newTestName);
              setNewTestName("");
            }
          }}
        >
          Create Test
        </button>
      </div>
    </div>
  );
};

export default TestView;
