import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, onClose, card, onDeleteItem, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  // const itemDeleteButtonClassName = `modal__delete-button ${
  //   isOwn ? "" : "modal__delete-button_hidden"
  // }`;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_content_image"
        ></button>
        {isLoggedIn && isOwn && (
          <button className="modal__delete-button" onClick={onDeleteItem}>
            Delete Item
          </button>
        )}
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
