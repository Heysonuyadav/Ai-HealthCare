import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="upload-page">
      {/* Animated Background */}
      <div className="cyber-grid"></div>
      <div className="scan-line"></div>
      
      <div className="upload-container">
        {/* Header Section */}
        <div className="upload-header">
          <div className="security-badge">
            <div className="pulse-dot"></div>
            SECURE CONNECTION
          </div>
          <h1 className="page-title">
            <span className="title-glow">SECURE UPLOAD</span>
            <span className="title-sub">PROTOCOL</span>
          </h1>
          <p className="page-subtitle">
            ENCRYPTED FILE & DATA TRANSMISSION SYSTEM
          </p>
        </div>
        
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-item">
            <span className="status-label">ENCRYPTION:</span>
            <span className="status-value active">AES-256 ACTIVE</span>
          </div>
          <div className="status-item">
            <span className="status-label">CONNECTION:</span>
            <span className="status-value secure">SECURE</span>
          </div>
          <div className="status-item">
            <span className="status-label">AUTHENTICATION:</span>
            <span className="status-value verified">VERIFIED</span>
          </div>
        </div>
        
        <div className="upload-form">
          <div className="form-content">
            {/* Image Input Button */}
            <div className="input-section">
              <div className="input-field-container">
                <label className="input-field-label">SELECT MEDIA FILE</label>
                <div className="file-input-wrapper">
                  <button
                    type="button"
                    className="file-input-button"
                    onClick={() => navigate("/imageanalysis")}
                  >
                    <span className="file-input-icon">🖼️</span>
                    <span className="file-input-text">ENTER TO ANALYZE MALICIOUS IMAGE</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Text Input Button */}
            <div className="input-section">
              <div className="input-field-container">
                <label className="input-field-label">ENTER SECURE MESSAGE</label>
                <div className="file-input-wrapper">
                  <button
                    type="button"
                    className="file-input-button"
                    onClick={() => navigate("/textanalysis")}
                  >
                    <span className="file-input-icon">🔐</span>
                    <span className="file-input-text">ENER TO ANALYZE MALICIOS TEXT</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary">
              <span className="button-icon">🔄</span>
              WIPE DATA
            </button>
            <button type="button" className="btn btn-primary">
              <span className="button-icon">🚀</span>
              INITIATE SECURE UPLOAD
            </button>
          </div>
        </div>

        {/* Footer Security Info */}
        <div className="security-footer">
          <div className="security-info">
            <span className="info-item">🔒 END-TO-END ENCRYPTION</span>
            <span className="info-item">🛡️ MALWARE SCANNED</span>
            <span className="info-item">🌐 SECURE TRANSMISSION</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;