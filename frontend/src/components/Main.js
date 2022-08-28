import Card from "./Card";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({cards, onCardClick, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace}) => {
 
  const currentUser = React.useContext(CurrentUserContext)

  const cardsElements = cards.map((card) => (            
    <Card 
      {...card} 
      card={card} 
      key={card._id} 
      onCardClick={onCardClick} 
      onCardLike={onCardLike} 
      onCardDelete={onCardDelete}
    />
  )) 
  return  (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar" />
          <button type="button" className="profile__avatar-button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section>
        <ul className="cards">
          {cardsElements}
        </ul>
      </section>
    </main>
  )
}

export default Main