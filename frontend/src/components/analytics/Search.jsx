import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProfilePreview from './ProfilePreview.jsx';
import DetailedProfile from './DetailedProfile.jsx';
import './Search.css';

const App = () => {
  const [names, setNames] = useState([]); 
  const [filteredNames, setFilteredNames] = useState([]); 
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Fetch only names from the backend when component mounts
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/student/getNames");
        const fetchedNames = response.data; // Store response in a variable
        console.log(fetchedNames); // You can perform actions here
        setNames(fetchedNames); // Set state if needed
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
  
    fetchNames();
  }, []);
  

  // Filter names for autocomplete suggestions
  const handleSearch = useCallback((searchText) => {
    const filtered = names.filter(name => 
      name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredNames(filtered);
  }, [names]);

  // Fetch full profile data when a name is selected
  const handleSelectProfile = useCallback((name) => {
    fetch(`/api/profile?name=${encodeURIComponent(name)}`)
      .then(response => response.json())
      .then(profileData => setSelectedProfile(profileData))
      .catch(error => console.error("Error fetching profile:", error));
  }, []);

  return (
    <div className='Search-container'>
      <div className="app-previewProfile">
        <input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        
        {selectedProfile && (
          <DetailedProfile profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
        )}
      </div>
      
      <div className="suggestions">
        {!selectedProfile && filteredNames.map((name, index) => (
          <ProfilePreview
            key={index}
            profile={{ NAME: name }} // Passing name only
            onSelect={() => handleSelectProfile(name)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
