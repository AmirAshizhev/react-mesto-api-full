import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import { useState, useEffect } from 'react';

const EditProfilePopup = ({onUpdateUser, isOpen, onClose}) => {
  const currentUser = React.useContext(CurrentUserContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm 
      name = "edit-button"
      title ="Редактировать профиль"
      isOpen = {isOpen}
      onClose = {onClose}
      buttonText = "Сохранить"
      onSubmit = {handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          <input 
            id="edit-button-name" 
            value={name || ""} 
            onChange={handleNameChange} 
            type="text"  
            name="name" 
            placeholder="Введите имя" 
            className="popup__item popup__item_name" 
            required 
            minLength ="2" 
            maxLength = "40" 
          />
          <span className="popup__item-error edit-button-name-error"></span>
        </label>
        <label className="popup__field">
          <input 
            id="edit-button-description" 
            value={description || ""} 
            onChange={handleDescriptionChange} 
            type="text"  
            name="about" 
            placeholder="Введите род деятельности" 
            className="popup__item popup__item_description" 
            required 
            minLength ="2" 
            maxLength = "200" 
          />
          <span className="popup__item-error edit-button-description-error"> </span>
        </label>
      </fieldset>
    </PopupWithForm> 
  )
}
    
export default EditProfilePopup;




