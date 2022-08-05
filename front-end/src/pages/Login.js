import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ target }, setter) => {
    setter(target.value);
  };

  return (
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
      <button type="button" data-testid="common_login__button-login">LOGIN</button>
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => navigate('./register') }
      >
        Ainda não tenho uma conta
      </button>
    </form>
  );
}

export default Login;
