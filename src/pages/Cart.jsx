import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import "../styles/Cart.scss";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart">
      <div className="cart-header">
        <h1>Your Cart</h1>
      </div>
      {cart.length === 0 ? (
        <p className="empty-cart-message">
          Your cart is empty. Please add items.
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total: {totalPrice.toFixed(2)} TL</h2>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
