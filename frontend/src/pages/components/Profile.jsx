import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState({
    username: 'Loading...',
    email: 'loading@example.com',
    role: 'user',
    joinDate: 'loading'
  });
  const [allUsers, setAllUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://ai-healthcare-orvs.onrender.com/auth/me', { withCredentials: true });
        const fetchedUser = response.data.user;
        const profileData = {
          username: fetchedUser.username,
          email: fetchedUser.email,
          role: fetchedUser.role || 'user',
          joinDate: fetchedUser.joinDate ? new Date(fetchedUser.joinDate).toLocaleDateString() : 'Unknown',
        };
        setUser(profileData);
        setEditedUser(profileData);

        if (profileData.role === 'admin') {
          const usersResponse = await axios.get('https://ai-healthcare-orvs.onrender.com/auth/users', { withCredentials: true });
          setAllUsers(usersResponse.data.users || []);
        }
      } catch (error) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          navigate('/login');
          return;
        }
        console.error('Error loading profile:', error);
        setError('Unable to load profile. Please login first.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

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

        {error && <div className="error-message">{error}</div>}

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
                <div className="profile-actions">
                  <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                  <button
                    type="button"
                    className="logout-button"
                    onClick={async () => {
                      await logout();
                      navigate('/login');
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {user.role === 'admin' && allUsers.length > 0 && (
          <div className="admin-users">
            <h2>All Registered Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u) => (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
