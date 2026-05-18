import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onHide }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>AI-SECURE</h2>
        <button className="sidebar-close-button" onClick={onHide}>
          ×
        </button>
      </div>
      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-link">
          <span className="icon">🏠</span> Home
        </Link>
        <Link to="/imageanalysis" className="sidebar-link">
          <span className="icon">🖼️</span> Image Analysis
        </Link>
        <Link to="/textanalysis" className="sidebar-link">
          <span className="icon">🔐</span> Text Analysis
        </Link>
        <Link to="/urlanalysis" className="sidebar-link">
          <span className="icon">🔗</span> URL Analysis
        </Link>
        <Link to="/history" className="sidebar-link">
          <span className="icon">📜</span> History
        </Link>
        <Link to="/notifications" className="sidebar-link">
          <span className="icon">🔔</span> Notifications
        </Link>
        <Link to="/profile" className="sidebar-link">
          <span className="icon">👤</span> Profile
        </Link>
      </nav>
      <div className="sidebar-auth">
        <Link to="/login" className="sidebar-link auth-link">
          <span className="icon">🔑</span> Login
        </Link>
        <Link to="/signup" className="sidebar-link auth-link">
          <span className="icon">📝</span> Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;