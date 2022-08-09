import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import { getProducts, getUser } from '../helpers/fetchAPI';
import { cleanUserData } from '../helpers/localStore';

export default function Products() {
  // const products = [];
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('User');
  const navigate = useNavigate();
  const getAll = async () => {
    setUsername(getUser().name);
    const allProducts = await getProducts();
    setProducts(allProducts.data);
  };
  const handleLogout = () => {
    cleanUserData();
    navigate('/');
  };
  useEffect(() => getAll(), []);
  return (
    <div>
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
      <body>
        {products.forEach((p) => {
          <Product props={ p } />;
        })}
      </body>
    </div>
  );
}
