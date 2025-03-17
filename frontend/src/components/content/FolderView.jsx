import React, { useState } from "react";

const FolderView = ({ folders, onFolderClick, onAddFolder, onRenameFolder }) => {
  const [newFolderName, setNewFolderName] = useState("");

  return (
    <div>
      <h2>Folders</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => onFolderClick(folder)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              cursor: "pointer",
              width: "150px",
              textAlign: "center",
            }}
          >
            <p>{folder.name}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const newName = prompt("Rename folder:", folder.name);
                if (newName) onRenameFolder(folder.id, newName);
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
          placeholder="New Folder Name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button
          onClick={() => {
            if (newFolderName.trim()) {
              onAddFolder(newFolderName);
              setNewFolderName("");
            }
          }}
        >
          Create Folder
        </button>
      </div>
    </div>
  );
};

export default FolderView;
