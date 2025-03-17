import React, { useState } from "react";
import FolderView from "./FolderView";
import TestView from "./TestView";
import QuestionView from "./QuestionView";

const Content = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: "Math", tests: [{ id: 1, name: "Test 1" }] },
    { id: 2, name: "Physics", tests: [{ id: 1, name: "Test 1" }] },
  ]);

  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentTest, setCurrentTest] = useState(null);

  const addFolder = (folderName) => {
    const newFolder = {
      id: folders.length + 1,
      name: folderName,
      tests: [],
    };
    setFolders([...folders, newFolder]);
  };

  const renameFolder = (id, newName) => {
    setFolders(
      folders.map((folder) =>
        folder.id === id ? { ...folder, name: newName } : folder
      )
    );
  };

  const addTest = (folderId, testName) => {
    setFolders(
      folders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              tests: [
                ...folder.tests,
                { id: folder.tests.length + 1, name: testName },
              ],
            }
          : folder
      )
    );
  };

  const renameTest = (folderId, testId, newName) => {
    setFolders(
      folders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              tests: folder.tests.map((test) =>
                test.id === testId ? { ...test, name: newName } : test
              ),
            }
          : folder
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {!currentFolder && (
        <FolderView
          folders={folders}
          onFolderClick={setCurrentFolder}
          onAddFolder={addFolder}
          onRenameFolder={renameFolder}
        />
      )}
      {currentFolder && !currentTest && (
        <TestView
          folder={currentFolder}
          onBack={() => setCurrentFolder(null)}
          onTestClick={setCurrentTest}
          onAddTest={(testName) => addTest(currentFolder.id, testName)}
          onRenameTest={(testId, newName) =>
            renameTest(currentFolder.id, testId, newName)
          }
        />
      )}
      {currentTest && (
        <QuestionView onBack={() => setCurrentTest(null)} />
      )}
    </div>
  );
};

export default Content;
