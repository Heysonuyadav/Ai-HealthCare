import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ImageAnalysis.css";

const TextAnalysis = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      alert("Please enter text to analyze.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/ai/text",
        { inputText },
        { withCredentials: true }
      );

      const txt = response.data.texts;

      setAnalysisResult({
        summary: txt?.description || "No description found."
      });
    } catch (error) {
      console.error("Error analyzing text:", error);
      alert("Failed to analyze text.");
    }

    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setInputText("");
    setAnalysisResult(null);
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
            <span className="title-glow">SECURE TEXT</span>
            <span className="title-sub">ANALYSIS</span>
          </h1>
          <p className="page-subtitle">
            ENCRYPTED CONTENT ANALYSIS SYSTEM
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

        {/* Analysis Form */}
        <div className="analysis-form">

          <div className="big-input-section">
            <div className="input-field-container">
              <label className="input-field-label">ENTER TEXT FOR ANALYSIS</label>

              <textarea
                className="big-text-input"
                rows="8"
                placeholder="Type or paste text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
          </div>

          {/* Result */}
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
              disabled={isAnalyzing || !inputText.trim()}
            >
              {isAnalyzing ? "⏳ ANALYZING..." : "🧠 ANALYZE TEXT"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TextAnalysis;
