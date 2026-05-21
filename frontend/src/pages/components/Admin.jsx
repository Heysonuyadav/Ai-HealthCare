import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Admin = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:3000/auth/admin-login',
                { password },
                { withCredentials: true }
            );
            setUsers(response.data.users || []);
            setAuthenticated(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid admin password');
            setAuthenticated(false);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="cyber-grid"></div>
            {/* <div className="scan-line"></div> */}

            <div className="auth-container">
                <div className="auth-header">
                    <h1>ADMIN LOGIN</h1>
                    <p>Enter admin password to view all users</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Admin Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Checking...' : 'Enter'}
                    </button>
                </form>

                {authenticated && (
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
                                {users.map((userItem) => (
                                    <tr key={userItem._id}>
                                        <td>{userItem.username}</td>
                                        <td>{userItem.email}</td>
                                        <td>{userItem.role}</td>
                                        <td>{new Date(userItem.createdAt).toLocaleDateString()}</td>
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

export default Admin;
