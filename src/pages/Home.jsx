import React, { useEffect, useState } from "react";
import CoffeeCard from "../components/CoffeeCard";
import Popup from "../components/Popup";
import { useCart } from "../context/CartContext";
import "../styles/Home.scss";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const { addToCart } = useCart();
  const [coffees, setCoffees] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Kahve verilerini çekmek için useEffect
  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const response = await fetch("./src/assets/data/data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoffees(data.coffees);
      } catch (error) {
        console.error("Error fetching coffee data:", error);
      }
    };
    fetchCoffees();
  }, []);

  // Sepete ekleme işlemi ve popup tetikleme
  const handleAddToCart = (coffee, size, extras) => {
    addToCart(coffee, size, extras);
    showPopup(`"${coffee.name}" başarıyla sepete eklendi!`);
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    setIsPopupVisible(true);
    setTimeout(() => setIsPopupVisible(false), 3000);
  };

  return (
    <div>
      <HeroSection />
      <div className="home">
        <header className="hero-section">
          <h1>Explore Our Finest Coffees</h1>
          <p>Indulge in a variety of rich, freshly brewed coffees.</p>
          <button
            className="cta-button"
            onClick={() => {
              window.scrollTo({
                top: document.querySelector(".coffee-list").offsetTop,
                behavior: "smooth",
              });
            }}
          >
            Browse Our Menu
          </button>
        </header>

        {/* Kahve Listesi */}
        <div className="coffee-list">
          {coffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Popup */}
        {isPopupVisible && <Popup message={popupMessage} />}

        {/* Footer */}
        <footer className="footer">
          <p>Connect with us on social media!</p>
          <div className="social-links">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
