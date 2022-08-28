import successImg from '../images/Union__yes.svg'
import errorImg from '../images/Union__no.svg'

const InfoTooltip = ({onClose, isOpen, isRegisterSuccess}) => {
  return (
    <div className={`infoTooltip ${isOpen && 'infoTooltip_opened'}`}>
      <div className="infoTooltip__container">
        <button className="infoTooltip__exit-button" type="button" aria-label="Закрыть cooбщение" onClick={onClose} ></button>
        <img src={isRegisterSuccess ? successImg : errorImg} className="infoTooltip__img"/>
        <p className="infoTooltip__text">{isRegisterSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
  </div>
  )
}

export default InfoTooltip