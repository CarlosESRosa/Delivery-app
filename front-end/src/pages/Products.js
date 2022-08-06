import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import { getProducts } from '../helpers/fetchAPI';

export default function Products() {
  // const products = [];
  const [products, setProducts] = useState([]);
  const getAll = async () => {
    const allProducts = await getProducts();
    setProducts(allProducts);
  };
  useEffect(() => getAll(), []);
  return (
    <div>
      <nav>
        <button
          type="button"
          onClick={ useNavigate('/customer/products') }
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </button>
        <button
          type="button"
          onClick={ useNavigate('/customer/orders') }
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </button>
        <button
          type="button"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          user
        </button>
        <button
          type="button"
          onClick={ useNavigate('/') }
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
