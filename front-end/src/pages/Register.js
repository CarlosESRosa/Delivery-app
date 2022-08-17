import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nMinLength, pMinLength } from '../helpers/constants';
import { addUser } from '../helpers/fetchAPI';
// const addUser = (data) => console.log(data);
import '../styles/pages/Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const handleEmail = ({ target }) => {
    setEmail(target.value);
    setIsEmailValid(target.value.includes('.') && target.value.includes('@'));
  };
  const handleClick = async () => {
    const res = await addUser({ name, email, password });
    const createdStatusNumber = 201;
    if (res.status !== createdStatusNumber) {
      setErrorMsg('Registro inválido');
    } else {
      navigate('../customer/products');
    }
  };
  return (
    <div className="page-register">
      <form className="register-form">
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
          className="default-button default-primary-button"
          type="button"
          data-testid="common_register__button-register"
          disabled={
            name.length < nMinLength || !isEmailValid || password.length < pMinLength
          }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
        <span data-testid="common_register__element-invalid_register">
          { errorMsg }
        </span>
      </form>
    </div>
  );
}

export default Register;
