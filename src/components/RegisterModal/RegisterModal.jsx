import React, { useState } from "react";
import "./RegisterModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({ onClose, onRegisterModalSubmit, isOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleAvatar = (event) => {
    setAvatar(event.target.value);
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    onRegisterModalSubmit(name, email, password, avatar);
  };

  return (
    <ModalWithForm
      title="Register"
      buttonText="Add User"
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={handleRegisterSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleName}
        />
      </label>
      <label htmlFor="email" className="modal__label">
        email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmail}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        password{" "}
        <input
          type="text"
          className="modal__input"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePassword}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        avatar{" "}
        <input
          type="URL"
          className="modal__input"
          id="avatar"
          placeholder="Enter Avatar URL"
          value={avatar}
          onChange={handleAvatar}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
