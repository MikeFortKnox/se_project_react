import React, { useState } from "react";
import "./ItemModal.css";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  // const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // const handleOpenDelete = (event) => {
  //   event.preventDefault();
  //   setDeleteConfirmOpen(true);
  // };

  // const handleConfirmDelete = () => {
  //   onDeleteItem(card._id); // Call the delete function with card data
  //   setDeleteConfirmOpen(false); // Close the confirmation modal
  //   onClose();
  // };

  // const handleCancelDelete = () => {
  //   setDeleteConfirmOpen(false);
  // };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_content_image"
        ></button>
        <button className="modal__delete-button" onClick={onDeleteItem}>
          Delete Item
        </button>
        <img src={card.imageUrl} alt="card" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
