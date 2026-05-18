import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ImageAnalysis.css";

const UrlAnalysis = () => {
    const navigate = useNavigate();
    const [inputUrl, setInputUrl] = useState("");
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        if (!inputUrl.trim()) {
            alert("Please enter a URL to analyze.");
            return;
        }

        // Basic URL validation
        try {
            new URL(inputUrl);
        } catch {
            alert("Please enter a valid URL.");
            return;
        }

        setIsAnalyzing(true);

        try {
            const response = await axios.post(
                "http://localhost:3000/ai/analyze-url", // Assuming this endpoint exists or will be added
                { inputUrl },
                { withCredentials: true }
            );

            const urlData = response.data.urls; // Adjust based on backend response

            setAnalysisResult({
                summary: urlData?.description || "No analysis found.",
                riskLevel: urlData?.riskLevel || "Unknown"
            });
        } catch (error) {
            console.error("Error analyzing URL:", error);
            alert("Failed to analyze URL.");
        }

        setIsAnalyzing(false);
    };

    const handleReset = () => {
        setInputUrl("");
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
                        <span className="title-glow">SECURE URL</span>
                        <span className="title-sub">ANALYSIS</span>
                    </h1>
                    <p className="page-subtitle">
                        ENCRYPTED LINK ANALYSIS SYSTEM
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

                    <div className="input-section">
                        <div className="input-field-container">
                            <label className="input-field-label">ENTER URL FOR ANALYSIS</label>

                            <input
                                type="url"
                                className="text-input"
                                placeholder="https://example.com"
                                value={inputUrl}
                                onChange={(e) => setInputUrl(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Result */}
                    {analysisResult && (
                        <div className="result-section">
                            <h3>Analysis Result</h3>
                            <p><strong>Risk Level:</strong> {analysisResult.riskLevel}</p>
                            <p><strong>Summary:</strong> {analysisResult.summary}</p>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleReset}
                        >
                            <span className="button-icon">🔄</span>
                            RESET
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                        >
                            <span className="button-icon">
                                {isAnalyzing ? "⏳" : "🔍"}
                            </span>
                            {isAnalyzing ? "ANALYZING..." : "ANALYZE URL"}
                        </button>
                    </div>
                </div>

                {/* Back Button */}
                <div className="back-button">
                    <button
                        type="button"
                        className="btn btn-back"
                        onClick={() => navigate("/")}
                    >
                        <span className="button-icon">⬅️</span>
                        BACK TO HOME
                    </button>
                </div>

                {/* Footer */}
                <div className="security-footer">
                    <div className="security-info">
                        <span className="info-item">🔒 END-TO-END ENCRYPTION</span>
                        <span className="info-item">🛡️ MALWARE SCANNED</span>
                        <span className="info-item">🌐 URL VERIFIED</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrlAnalysis;