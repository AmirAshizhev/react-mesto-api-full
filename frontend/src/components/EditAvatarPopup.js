import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import { useEffect } from 'react';

const EditAvatarPopup = ({onUpdateAvatar, isOpen, onClose}) => {
  
  const currentUser = React.useContext(CurrentUserContext)
  const avatarRef = React.useRef();

  useEffect(() => {
    avatarRef.current.value=currentUser.avatar
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm 
      name = "avatar"
      title ="Обновить аватар"
      isOpen = {isOpen}
      onClose = {onClose}
      buttonText = "Сохранить"
      onSubmit = {handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          <input ref={avatarRef} id="avatar-button-description" type="url"  name="link" placeholder="Ссылка на аватар"  className="popup__item popup__item_description"  required />
          <span className="popup__item-error avatar-button-description-error"> </span>
        </label>
      </fieldset>
    </PopupWithForm> 
  )
}
    
export default EditAvatarPopup;