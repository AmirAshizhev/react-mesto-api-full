import { useState } from "react";

const Login = ({handleLogin}) => {

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setData((oldData) => ({
      ...oldData,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log (data)
    handleLogin(data);
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="login__title">Вход</h2>
      <fieldset className="login__fieldset">
        <label className="popup__field">
          <input 
            type="email"  
            name="email" 
            placeholder="Email" 
            className="login__input" 
            required 
            onChange={handleChange}
            value = {data.email}
          />
          <span className="popup__item-error edit-button-name-error"></span>
        </label>
        <label className="popup__field">
          <input 
            type="password"  
            name="password" 
            placeholder="Пароль" 
            className="login__input" 
            required 
            onChange={handleChange}
            value = {data.password}
          />
          <span className="popup__item-error edit-button-description-error"> </span>
        </label>
      </fieldset>
      <button className="login__button" type="submit" aria-label="Войти">Войти</button>
    </form>
  )
}

export default Login