import React, { useState } from 'react';
import { addUser } from '../helpers/fetchAPI';
// const addUser = (data) => console.log(data);

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const handleEmail = ({ target }) => {
    setEmail(target.value);
    setIsEmailValid(target.value.includes('.') && target.value.includes('@'));
  };
  const nMinLength = 12;
  const pMinLength = 6;
  return (
    <form>
      <h1>Cadastro</h1>
      <label htmlFor="common_register__input-name">
        <h3>Nome</h3>
        <input
          id="common_register__input-name"
          data-testid="common_register__input-name"
          value={ name }
          placeholder="Seu nome"
          type="text"
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>
      <label htmlFor="common_register__input-email">
        <h3>Email</h3>
        <input
          id="common_register__input-email"
          data-testid="common_register__input-email"
          value={ email }
          placeholder="Email"
          type="text"
          onChange={ handleEmail }
        />
      </label>
      <label htmlFor="common_register__input-password">
        <h3>Senha</h3>
        <input
          id="common_register__input-password"
          data-testid="common_register__input-password"
          value={ password }
          placeholder="Senha"
          type="password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="common_register__button-register"
        disabled={
          name.length < nMinLength || !isEmailValid || password.length < pMinLength
        }
        onClick={ () => addUser({ name, email, password }) }
      >
        Cadastrar
      </button>
      <span data-testid="common_register__element-invalid_register" />
    </form>
  );
}

export default Register;
