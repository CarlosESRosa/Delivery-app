import React from 'react';

function Register() {
  return (
    <form>
      <h1>Cadastro</h1>
      <label htmlFor="common_register__input-name">
        <h3>Nome</h3>
        <input
          id="common_register__input-name"
          data-testid="common_register__input-name"
          placeholder="Seu nome"
          type="text"
        />
      </label>
      <label htmlFor="common_register__input-email">
        <h3>Email</h3>
        <input
          id="common_register__input-email"
          data-testid="common_register__input-email"
          placeholder="Email"
          type="text"
        />
      </label>
      <label htmlFor="common_register__input-password">
        <h3>Senha</h3>
        <input
          id="common_register__input-password"
          data-testid="common_register__input-password"
          placeholder="Senha"
          type="password"
        />
      </label>
      <button type="button" data-testid="common_register__button-register">
        Cadastrar
      </button>
      <span data-testid="common_register__element-invalid_register" />
    </form>
  );
}

export default Register;
