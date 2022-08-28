const PopupWithForm = ({name, isOpen, onClose, onSubmit, title, buttonText, children}) => {
  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__exit-button" type="button" aria-label="Закрыть форму" onClick={onClose} ></button>
        <form name={`popup__form_${name}`} id={`popup__form_${name}`} className="popup__form" noValidate onSubmit={onSubmit}>
          <h2 className="popup__title popup__title_avatar">{title}</h2>
            {children}
          <button className="popup__save-button popup__save-button_avatar" type="submit" aria-label="Сохранить">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;