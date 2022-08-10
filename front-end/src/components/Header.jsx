import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { cleanUserData, getLocalUser } from '../helpers/localStore';

export default function Header(props) {
  const { isProductPage } = props;
  // Nas páginas em que o botão "produtos" não aparece,
  // ...é só não colocar a prop isProductPage (ou colocar como false).
  const [username, setUsername] = useState('User');
  const navigate = useNavigate();
  const handleLogout = () => {
    cleanUserData();
    navigate('/');
  };
  useEffect(() => setUsername(getLocalUser().name), []);
  return (
    <header>
      { isProductPage
        && (
          <button
            type="button"
            onClick={ () => navigate('/customer/products') }
            data-testid="customer_products__element-navbar-link-products"
          >
            PRODUTOS
          </button>
        )}
      <button
        type="button"
        onClick={ () => navigate('/customer/orders') }
        data-testid="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
      </button>
      <button
        type="button"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { username }
      </button>
      <button
        type="button"
        onClick={ handleLogout }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </header>
  );
}

Header.propTypes = {
  isProductPage: PropTypes.bool,
}.isRequired;
