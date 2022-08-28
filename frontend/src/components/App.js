import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from 'react';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, getContent } from "../utils/authApi";
import { useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function App() {

  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false) 
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)

  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [curretUser, setCurrentUser] = useState({})

  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState({email: ''})

  useEffect(() => {
    if(loggedIn){
    Promise.all([api.getUserInformation(), api.getInitialCards()])
    .then(([userInformation, cards])=>{
      setCurrentUser(userInformation)
      setCards(cards)
    })
    .catch(err => {
      console.log(err);
    });
  }     
  },[loggedIn])

  useEffect(()=>{
    tokenCheck();
  },[])

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isInfoTooltipOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 


  function handleCardClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === curretUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(res => console.log(res));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {setCards((state) => state.filter((c) => c._id !== card._id ));})
    .catch(res => console.log(res));
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false)
    setIsInfoTooltipOpen(false)
  }

  function handleUpdateUser (data) {
    api.setUserInformation(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(res => console.log(res));
    
  }

  function handleUpdateAvatar (data) {
    api.setUserAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(res => console.log(res));
    
  }

  function handleAddPlaceSubmit (data) {
    api.getNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(res => console.log(res));
    
  }

  function handleRegister({email, password}) {
    register(email, password)
    .then((data) => {
      // console.log(data)
      setIsRegisterSuccess(true);
      setIsInfoTooltipOpen(true);
      setUserData({email: data.email})
      navigate("/sign-in")
    })
    .catch((err) => {
      setIsRegisterSuccess(false);
      setIsInfoTooltipOpen(true);
      console.log(err)
    })
  }

  function handleLogin({email, password}){
    authorize(email, password)
    .then((data) => {
      // console.log(data)
      if (data.token){
        localStorage.setItem('token', data.token);
        api.setToken(data.token)
        setLoggedIn(true)
        setUserData({email: email})
        navigate("/")         
      }
    })
    // .then(()=>{
    //   api.getUserInformation()
    //   .then(user => {
    //     setCurrentUser(user)
        
    //   })
    //   .catch(err => console.log(err))      
    // })
    // .then(()=>{
    //   api.getInitialCards()
    //   .then((cards) => setCards(cards))
    //   .catch(err => console.log(err))

    // })
    .catch(err => console.log(err))
  }

  function tokenCheck(){
    let token = localStorage.getItem('token');
    if (token){
      getContent(token)
      .then((res) => {
        if(res.email){
          setLoggedIn(true)
          setUserData({email: res.email})
          navigate("/")
        }
      })
      .catch(err => console.log(err))
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setUserData({
      email: ''
    })
    setLoggedIn(false)
  }

  return (
    <div className="page">
      <div>
        <CurrentUserContext.Provider value={curretUser}>
          <Header userEmail={userData.email} handleLogout={handleLogout}/>

          <Routes>
            <Route path="/" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main 
                  onEditProfile = {handleEditProfileClick}
                  onEditAvatar = {handleEditAvatarClick}
                  onAddPlace = {handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>}
            />
            <Route path="/sign-up" element={<Register handleRegister={handleRegister}/>}/>
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} tokenCheck={tokenCheck}/>}/>
            <Route path="*" element={
              loggedIn ? <Navigate to="/"/> : <Navigate to="/sign-in"/>}/>
          </Routes>

          <Footer/>

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm 
            name = "trash"
            title ="Вы уверены?"
            onClose = {closeAllPopups}
            buttonText = "Да"
          />

          <ImagePopup
            card = {selectedCard}
            isOpen = {isImagePopupOpen}
            onClose = {closeAllPopups}
          />

          <InfoTooltip
            isOpen = {isInfoTooltipOpen}
            onClose = {closeAllPopups}
            isRegisterSuccess = {isRegisterSuccess}

          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
