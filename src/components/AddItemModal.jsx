import { useState } from "react";
import ModalWithForm from "./ModalWithForm/ModalWithForm";

const AddItemModal = ({ onClose, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleImageUrl = (event) => {
    setImageUrl(event.target.value);
  };

  const handleWeather = (event) => {
    setWeather(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onAddItem(name, imageUrl, weather);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={handleFormSubmit}
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
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeather}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeather}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeather}
          />{" "}
          Cold
        </label>
        <button type="submit" className="modal__save">
          {" "}
          Add Garment{" "}
        </button>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
