import React from 'react';

const DetailedProfile = ({ profile, onClose }) => (
  <>
    <div className="modal-overlay" onClick={onClose}></div>
    <div className="detailed-profile">
      <button className="close-button" onClick={onClose}>×</button>
      
      <div className="profile-container">
        {profile.IMAGE && (
          <img src={profile.IMAGE} alt={profile.NAME} className="profile-pic-large" />
        )}
        
        <h2>{profile.NAME}</h2>
      </div>
      
      {/* Dynamically generate details based on profile properties */}
      <ul className="profile-details">
        {Object.entries(profile).map(([key, value]) => (
          // Skip the IMAGE field and any other fields you don’t want displayed
          key !== 'IMAGE' && key !== 'NAME' && (
            <li key={key}>
              <strong>{key.replace(/_/g, ' ')}:</strong> {value || 'N/A'}
            </li>
          )
        ))}
      </ul>
    </div>
  </>
);

export default DetailedProfile;
