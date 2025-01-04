import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Popup from "./components/Popup";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import "./App.scss";

const App = () => {
  const [popupMessage, setPopupMessage] = React.useState("");
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);

  const showPopup = (message) => {
    setPopupMessage(message);
    setIsPopupVisible(true);
    setTimeout(() => setIsPopupVisible(false), 3000);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />

          {isPopupVisible && <Popup message={popupMessage} />}
          <Routes>
            <Route path="/" element={<Home showPopup={showPopup} />} />
            <Route path="/cart" element={<Cart showPopup={showPopup} />} />
            <Route path="/login" element={<Login showPopup={showPopup} />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout showPopup={showPopup} />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
