import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const addToCart = (coffee, size, extras) => {
    const existingItem = cart.find(
      (item) =>
        item.id === coffee.id &&
        item.size === size &&
        JSON.stringify(item.extras) === JSON.stringify(extras)
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === coffee.id &&
          item.size === size &&
          JSON.stringify(item.extras) === JSON.stringify(extras)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...coffee, quantity: 1, size, extras }]);
    }
  };

  const updateQuantity = (id, size, extras, quantity) => {
    if (quantity <= 0) {
      setCart(
        cart.filter(
          (item) =>
            item.id !== id ||
            item.size !== size ||
            JSON.stringify(item.extras) !== JSON.stringify(extras)
        )
      );
    } else {
      setCart(
        cart.map((item) =>
          item.id === id &&
          item.size === size &&
          JSON.stringify(item.extras) === JSON.stringify(extras)
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (id, size, extras) => {
    setCart(
      cart.filter(
        (item) =>
          item.id !== id ||
          item.size !== size ||
          JSON.stringify(item.extras) !== JSON.stringify(extras)
      )
    );
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
