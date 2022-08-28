import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useState, useEffect } from 'react';

const AddPlacePopup = ({onAddPlace, isOpen, onClose}) => {
  
  const [place, setPlace] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    setPlace('');
    setLink('');
  }, [isOpen]);


  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: place,
      link
    });
  } 

  return (
    <PopupWithForm 
      name = "add-button"
      title ="Новое место"
      isOpen = {isOpen}
      onClose = {onClose}
      buttonText = "Создать"
      onSubmit = {handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          <input 
            id="add-button-name" 
            type="text" 
            value={place} 
            onChange={handlePlaceChange} 
            name="name" 
            placeholder="Название"  
            className="popup__item popup__item_name"  
            required 
            minLength ="2" 
            maxLength = "30" 
          />
          <span className="popup__item-error add-button-name-error"> </span>
        </label>
        <label className="popup__field">
          <input 
            id="add-button-description" 
            type="url" 
            value={link} 
            onChange={handleLinkChange} 
            name="link" 
            placeholder="Ссылка на картинку"  
            className="popup__item popup__item_description"  
            required />
          <span className="popup__item-error add-button-description-error"> </span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
    
export default AddPlacePopup;