import React, { useState, useEffect } from "react";
import "../styles/Popup.scss";

const Popup = ({ message, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowSuccessMessage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="popup">
      {isLoading ? (
        <div className="loader">
          <img
            src="/images/barista.webp"
            alt="Barista pouring coffee"
            className="barista-loader"
          />
          <div className="loading-bar"></div>
        </div>
      ) : showSuccessMessage ? (
        <p className="success-message">Successfully Added to Cart</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default Popup;
