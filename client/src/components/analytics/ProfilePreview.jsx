import React from 'react';

const ProfilePreview = ({ profile, onSelect }) => {
  return (
    <div className="profile-preview">
      <h3>{profile.NAME}</h3>
      <p>Branch: {profile.BRANCH}</p>
      <button onClick={onSelect}>View Profile</button>
    </div>
  );
};

export default ProfilePreview;
