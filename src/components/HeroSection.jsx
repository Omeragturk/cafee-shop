import React from "react";
import "../styles/HeroSection.scss";

const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1 className="fade-in">Welcome to Coffee-Shop</h1>
        <p className="fade-in">
          Explore our wide range of coffee, tea, and snacks.
        </p>

        <button onClick={scrollToContent} className="scroll-button">
          ⬇ Explore
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
