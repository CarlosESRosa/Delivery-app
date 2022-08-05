import React from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';

export default function Products() {
  const products = [];
  return (
    <div>
      <nav>
        <button type="button" onClick={ useNavigate('/customer/products') }>
          PRODUTOS
        </button>
        <button type="button" onClick={ useNavigate('/customer/orders') }>
          MEUS PEDIDOS
        </button>
        <button type="button">
          user
        </button>
        <button type="button" onClick={ useNavigate('/') }>
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
