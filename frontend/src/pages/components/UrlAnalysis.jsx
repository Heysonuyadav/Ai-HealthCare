import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ImageAnalysis.css";

const UrlAnalysis = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [question, setQuestion] = useState("");
    const [questionAnswer, setQuestionAnswer] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isAsking, setIsAsking] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setAnalysisResult(null);
        }
    };

    const handleAnalyze = async () => {
        if (!image) {
            alert("Please select an image first.");
            return;
        }

        setIsAnalyzing(true);

        try {
            const formData = new FormData();
            formData.append("image", image);

            const response = await axios.post(
                "https://ai-healthcare-orvs.onrender.com/ai/analyze-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            const img = response.data?.data || response.data?.imageText || {};

            setAnalysisResult({
                summary: img?.description || "No description found."
            });
            setQuestion("");
            setQuestionAnswer(null);
        } catch (error) {
            console.error("Error analyzing image:", error);
            alert("Failed to analyze image.");
        }

        setIsAnalyzing(false);
    };

    const handleAskQuestion = async () => {
        if (!analysisResult?.summary) {
            alert("Please analyze an image first.");
            return;
        }
        if (!question.trim()) {
            alert("Please enter a question.");
            return;
        }

        setIsAsking(true);

        try {
            const response = await axios.post(
                "https://ai-healthcare-orvs.onrender.com/ai/image-question",
                {
                    description: analysisResult.summary,
                    question: question.trim(),
                },
                { withCredentials: true }
            );

            setQuestionAnswer(response.data?.answer || "No answer available.");
        } catch (error) {
            console.error("Error asking question:", error);
            alert("Failed to ask question.");
        }

        setIsAsking(false);
    };

    const handleReset = () => {
        setImage(null);
        setImagePreview(null);
        setAnalysisResult(null);
        setQuestion("");
        setQuestionAnswer(null);
        const fileInput = document.getElementById("image-upload");
        if (fileInput) fileInput.value = "";
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
                        <span className="title-glow">SECURE IMAGE</span>
                        <span className="title-sub">ANALYSIS</span>
                    </h1>
                    <p className="page-subtitle">
                        IMAGE UPLOAD & CHECK SYSTEM
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
                            <label className="input-field-label">SELECT IMAGE TO ANALYZE</label>

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
                                            <span className="big-file-input-text">CHOOSE IMAGE</span>
                                            <span className="big-file-input-subtext">Click to select an image</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {analysisResult && (
                        <>
                            <div className="simple-analysis-result">
                                <div className="result-card">
                                    <div className="result-header">
                                        <h2># Analysis Complete</h2>
                                    </div>
                                    <div className="result-content">
                                        <div className="result-summary">
                                            <h3>Summary</h3>
                                            <p>{analysisResult.summary}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="question-group">
                                <label className="input-field-label">Ask a short question about this image</label>
                                <textarea
                                    className="question-input"
                                    rows={2}
                                    placeholder="What is this image showing?"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                                <div className="question-actions">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleAskQuestion}
                                        disabled={isAsking || !question.trim()}
                                    >
                                        {isAsking ? "⏳ ASKING..." : "Ask"}
                                    </button>
                                </div>
                            </div>

                            {questionAnswer && (
                                <div className="question-answer">
                                    <h3>Answer</h3>
                                    <p>{questionAnswer}</p>
                                </div>
                            )}
                        </>
                    )}

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/")}
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

export default UrlAnalysis;
