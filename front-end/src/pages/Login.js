import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target }, setter) => {
    setter(target.value);
  };

  return (
    <form>
      <input
        type="email"
        data-testid="1"
        placeholder="email@trybeer.com.br"
        value={ email }
        onChange={ (event) => handleChange(event, setEmail) }
      />
      <input
        type="password"
        data-testid="1"
        placeholder="********"
        value={ password }
        onChange={ (event) => handleChange(event, setPassword) }
      />
      <button type="button" data-testid="3">LOGIN</button>
      <button type="button" data-testid="4">Ainda não tenho uma conta</button>
    </form>
  );
}

export default Login;
