import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/InputField.css";

const InputField = ({
  label,
  type = "text",
  placeholder,
  navigateTo
}) => {
  const navigate = useNavigate();

  return (
    <div className="input-field-container">
      {label && <label className="input-field-label">{label}</label>}

      {/* Button styled like your image upload box */}
      <div className="file-input-wrapper">
        <button
          type="button"
          className="file-input-button"
          onClick={() => navigate(navigateTo)}  // SIMPLE WORKING NAVIGATION
        >
          <span className="file-input-icon">
            {type === "file" ? "🖼️ Analayze image" : "🔐"}
          </span>

          <span className="file-input-text">
            {placeholder}
          </span>
        </button>
      </div>
    </div>
  );
};

export default InputField;
