import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/Checkout.scss";

const Checkout = () => {
  const { totalPrice } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const [isCardBack, setIsCardBack] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const validators = {
      cardNumber: (val) => /^\d*$/.test(val) && val.length <= 16,
      expiryDate: (val) => /^\d{0,2}\/?\d{0,2}$/.test(val) && val.length <= 5,
      cvc: (val) => /^\d*$/.test(val) && val.length <= 3,
    };

    if (validators[name] && !validators[name](value)) return;

    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field) => setIsCardBack(field === "cvc");

  const handleSubmit = () => {
    if (Object.values(customerInfo).some((value) => !value.trim())) {
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }
    alert("Sipariş başarıyla tamamlandı!");
    console.log("Sipariş Detayları:", customerInfo);
  };

  return (
    <div className="checkout-container">
      <h1 className="title">Ödeme</h1>
      <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="name">Ad</label>
          <input
            id="name"
            name="name"
            placeholder="Adınız"
            value={customerInfo.name}
            onChange={handleInputChange}
            onFocus={() => handleFocus("name")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefon</label>
          <input
            id="phone"
            name="phone"
            placeholder="Telefon Numaranız"
            value={customerInfo.phone}
            onChange={handleInputChange}
            onFocus={() => handleFocus("phone")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Adres</label>
          <textarea
            id="address"
            name="address"
            placeholder="Adresiniz"
            value={customerInfo.address}
            onChange={handleInputChange}
            onFocus={() => handleFocus("address")}
          />
        </div>

        <div className="credit-card-preview">
          <div className={`credit-card ${isCardBack ? "flipped" : ""}`}>
            <div className="card-front">
              <div className="bank-logo"></div>
              <div className="card-number">
                {customerInfo.cardNumber
                  .padEnd(16, "•")
                  .replace(/(.{4})/g, "$1 ")}
              </div>
              <div className="details">
                <span className="expiry-date">
                  {customerInfo.expiryDate || "MM/YY"}
                </span>
                <span className="card-holder">
                  {customerInfo.name || "AD SOYAD"}
                </span>
              </div>
            </div>
            <div className="card-back">
              <div className="black-stripe"></div>
              <div className="cvc">
                <input
                  type="text"
                  name="cvc"
                  maxLength="3"
                  placeholder="CVC"
                  value={customerInfo.cvc}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("cvc")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Kart Numarası</label>
          <input
            id="cardNumber"
            name="cardNumber"
            placeholder="XXXX XXXX XXXX XXXX"
            value={customerInfo.cardNumber}
            onChange={handleInputChange}
            onFocus={() => handleFocus("cardNumber")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Son Kullanma Tarihi</label>
          <input
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            value={customerInfo.expiryDate}
            onChange={handleInputChange}
            onFocus={() => handleFocus("expiryDate")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input
            id="cvc"
            name="cvc"
            placeholder="CVC"
            value={customerInfo.cvc}
            onChange={handleInputChange}
            onFocus={() => handleFocus("cvc")}
          />
        </div>

        <div className="total-amount">
          <div className="total-label">Toplam Tutar</div>
          <div className="total-amount-value">{totalPrice.toFixed(2)} ₺</div>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Sipariş Ver
        </button>
      </form>
    </div>
  );
};

export default Checkout;
