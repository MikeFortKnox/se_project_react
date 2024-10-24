import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  const handleOpenDelete = (event) => {
    event.preventDefault();
    onDeleteItem(name, imageUrl, weather);
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_content_image"
        ></button>
        <button onClick={handleOpenDelete}>Delete</button>
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
