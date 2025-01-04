import React, { useState } from "react";
import "../styles/CoffeeCard.scss";

const CoffeeCard = ({ coffee, onAddToCart }) => {
  const [size, setSize] = useState("Medium");
  const [extras, setExtras] = useState([]);
  const extraPrices = {
    "Lactose-Free Milk": 5,
    "Caramel Syrup": 7,
  };
  const sizePrices = {
    Small: 0,
    Medium: 5,
    Large: 10,
  };

  const handleSizeChange = (e) => setSize(e.target.value);

  const handleExtrasChange = (e) => {
    const { value, checked } = e.target;
    setExtras((prevExtras) =>
      checked
        ? [...prevExtras, value]
        : prevExtras.filter((extra) => extra !== value)
    );
  };

  const calculatePrice = () => {
    const basePrice = coffee.price;
    const extraCost = extras.reduce(
      (sum, extra) => sum + extraPrices[extra],
      0
    );
    const sizeCost = sizePrices[size];
    return basePrice + extraCost + sizeCost;
  };

  const handleAddToCart = () => {
    const finalPrice = calculatePrice();
    onAddToCart({ ...coffee, price: finalPrice }, size, extras);
  };

  return (
    <div className="coffee-card">
      <img src={coffee.image} alt={coffee.name} className="coffee-card-image" />
      <h3>{coffee.name}</h3>
      <p>{coffee.description}</p>
      <p className="price">{calculatePrice()} TL</p>

      <div className="size-options">
        <label>Size:</label>
        <select value={size} onChange={handleSizeChange}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      <div className="extras-options">
        <label>
          <input
            type="checkbox"
            value="Lactose-Free Milk"
            onChange={handleExtrasChange}
          />
          Lactose-Free Milk (+5 TL)
        </label>
        <label>
          <input
            type="checkbox"
            value="Caramel Syrup"
            onChange={handleExtrasChange}
          />
          Caramel Syrup (+7 TL)
        </label>
      </div>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default CoffeeCard;
