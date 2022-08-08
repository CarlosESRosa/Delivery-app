import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pMinLength } from '../helpers/constants';
import { login } from '../helpers/fetchAPI';
// import { saveUser } from '../helpers/localStore';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target }, setter) => {
    setter(target.value);
  };

  const handleLogin = async () => {
    try {
      await login({ email, password });
      navigate('/customer/products');
    } catch (error) {
      setIsInvalidLogin(true);
      console.log(error);
    }
  };

  const isEmailValid = email.includes('.') && email.includes('@');

  return (
    <>
      <form>
        <input
          type="email"
          data-testid="common_login__input-email"
          placeholder="email@trybeer.com.br"
          value={ email }
          onChange={ (event) => handleChange(event, setEmail) }
        />
        <input
          type="password"
          data-testid="common_login__input-password"
          placeholder="********"
          value={ password }
          onChange={ (event) => handleChange(event, setPassword) }
        />
        <button
          type="button"
          data-testid="common_login__button-login"
          onClick={ handleLogin }
          disabled={ !isEmailValid || password.length < pMinLength }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => navigate('../register') }
        >
          Ainda não tenho uma conta
        </button>
      </form>
      {isInvalidLogin
        && <p data-testid="common_login__element-invalid-email">Login invalido 404</p>}
    </>

  );
}

export default Login;
