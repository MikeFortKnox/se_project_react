import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
// import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLogin,
  handleRegister,
  currentUser,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {!isLoggedIn && (
        <>
          <button
            onClick={handleRegister}
            type="button"
            className="header__register-button"
          >
            SignUp
          </button>
          <button
            onClick={handleLogin}
            type="button"
            className="header__signin-button"
          >
            Login
          </button>
        </>
      )}
      {isLoggedIn && (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <p className="header__username">{currentUser.name}</p>
          <Link to="/profile" className="header__link">
            <img src={avatar} alt="avatar" className="header__avatar" />
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
