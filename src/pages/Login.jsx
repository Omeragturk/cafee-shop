import React, { useState } from "react";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setNotification({
        type: "error",
        message: "Please fill in all fields!",
      });
      return;
    }

    const result = await login(formData.username, formData.password);
    if (result.success) {
      setNotification({ type: "success", message: "Login successful!" });
      navigate("/checkout");
    } else {
      setNotification({ type: "error", message: result.error });
    }
  };

  return (
    <div className="creative-login-container">
      <div className="form-card">
        <h1 className="title">Welcome to Coffe-Shop</h1>
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <label>Username</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <label>Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
