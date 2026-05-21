import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div style={{ padding: '2rem', color: '#fff' }}>Checking authentication...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/signup" replace />;
};

export default PrivateRoute;
