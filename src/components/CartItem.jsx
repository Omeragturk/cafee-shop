import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/CartItem.scss";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, item.size, item.extras, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-size">Size: {item.size}</p>
        <p className="item-extras">Extras: {item.extras.join(", ")}</p>
      </div>
      <div className="item-summary">
        <p className="item-price">
          {item.price} TL x {item.quantity} = {item.price * item.quantity} TL
        </p>
        <div className="quantity-controls">
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="quantity-btn"
          >
            +
          </button>
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="quantity-btn"
          >
            -
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id, item.size, item.extras)}
          className="remove-btn"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
