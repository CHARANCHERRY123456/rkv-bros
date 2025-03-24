import FolderList from './FolderList.jsx';
import AssignmentList from './AssignmentFolder.jsx';
import { useState } from 'react';

const Home = ()=>{
    const [selectedFolder , setSelectedFolder] = useState(null);

    return (
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">📂 Assignment Explorer</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold">Folders</h2>
              <FolderList onSelectFolder={setSelectedFolder} />
            </div>
            <div>
              <h2 className="font-semibold">Assignments</h2>
              {selectedFolder ? <AssignmentList folderId={selectedFolder} /> : <p>Select a folder to view assignments</p>}
            </div>
          </div>
        </div>
    );
};

export default Home;