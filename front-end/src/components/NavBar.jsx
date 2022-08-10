import React, { useState } from 'react';
import { cleanUserData } from '../helpers/localStore';
import { getUser } from '../helpers/fetchAPI';

export default function NavBar() {
  const [username, setUsername] = useState('User');
  const navigate = useNavigate();
  const handleLogout = () => {
    cleanUserData();
    navigate('/');
  };
  useEffect(() => setUsername(getUser(localStorage.getItem('token')).name), []);
  return (
    <nav>
      <button
        type="button"
        onClick={ () => navigate('/customer/products') }
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </button>
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
    </nav>
  );
}
