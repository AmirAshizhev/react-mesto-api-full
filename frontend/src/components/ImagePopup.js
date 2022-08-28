const ImagePopup = (props) => {
  return (
    <div className={` popup popup_picture ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_full-screen">
      <button className="popup__exit-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <img src={props.card?.link} alt={props.card?.name} className="popup__img" />
        <p className="popup__text">{props.card?.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;