import "./ModalWithForm.css";

function ModalWithForm({ children, title, isOpen, onClose, onFormSubmit }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form className="modal__form" onSubmit={onFormSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
