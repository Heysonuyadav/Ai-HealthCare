import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    username: 'Loading...',
    email: 'loading@example.com',
    role: 'Security Analyst',
    joinDate: '2023-01-15'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/me', { withCredentials: true });
        const fetchedUser = response.data.user;
        const profileData = {
          username: fetchedUser.username,
          email: fetchedUser.email,
          role: 'Security Analyst',
          joinDate: '2023-01-15',
        };
        setUser(profileData);
        setEditedUser(profileData);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    // TODO: send profile update request to backend
  };

  if (loading) {
    return <div className="profile-page"><div className="content-container">Loading profile...</div></div>;
  }

  return (
    <div className="profile-page">
      <div className="cyber-grid"></div>
      <div className="scan-line"></div>

      <div className="content-container">
        <div className="page-header">
          <h1>USER PROFILE</h1>
          <p>Manage your account information</p>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            <span>👤</span>
          </div>

          <div className="profile-details">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                  placeholder="Username"
                />
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={editedUser.role}
                  onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                  placeholder="Role"
                />
                <div className="profile-actions">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h2>{user.username}</h2>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Member since: {user.joinDate}</p>
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;