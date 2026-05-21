import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import './ImageAnalysis.css';
import axios from "axios";

const ImageAnalysis = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setAnalysisResult(null);
    }
  };

  // Optional initial load
  useEffect(() => {
    axios.post("https://ai-healthcare-orvs.onrender.com/ai/analyze-image", {
      withcredential: true
    }).then((response) => {
      setAnalysisResult(response.data.analysisResult);
    });
  }, []);

  const handleAnalyze = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(
      "http://localhost:3000/ai/analyze-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    const img = response.data.imageText;

    setAnalysisResult({
      status: img?.status || "Unknown",
      confidence: img?.confidence || "N/A",
      summary: img?.description || "No description found."
    });

    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="upload-page">
      <div className="cyber-grid"></div>
      <div className="scan-line"></div>
      
      <div className="upload-container">

        {/* Header */}
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

        {/* Status */}
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

        {/* Upload */}
        <div className="analysis-form">

          <div className="big-input-section">
            <div className="input-field-container">
              <label className="input-field-label">SELECT MEDIA FILE</label>

              <div className="big-file-input-wrapper">
                <input
                  type="file"
                  id="image-upload"
                  className="file-input-hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <div 
                  className="big-file-input-area"
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  {imagePreview ? (
                    <div className="big-image-preview">
                      <img src={imagePreview} alt="Preview" className="big-preview-image" />
                      <div className="big-preview-overlay">
                        <div className="big-security-tag">
                          <span className="big-lock-icon">🔒</span>
                          ENCRYPTED PREVIEW
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="big-file-input-content">
                      <span className="big-file-input-icon">🖼️</span>
                      <span className="big-file-input-text">CHOOSE FILE</span>
                      <span className="big-file-input-subtext">Click to select an image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Analysis result */}
          {analysisResult && (
            <div className="simple-analysis-result">
              <div className="result-card">
                <div className="result-header">
                  <h2># Analysis Complete</h2>
                </div>
                <div className="result-content">

                  <div className="result-summary">
                    <h3>Analysis Summary</h3>
                    <p>{analysisResult.summary}</p>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/')}
            >
              ← BACK TO HOME
            </button>

            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleReset}
              disabled={isAnalyzing}
            >
              🔄 CLEAR
            </button>

            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !image}
            >
              {isAnalyzing ? "⏳ ANALYZING..." : "🔍 ANALYZE IMAGE"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ImageAnalysis;
