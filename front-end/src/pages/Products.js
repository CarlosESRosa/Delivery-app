import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Product from '../components/Product';
import { getProducts } from '../helpers/fetchAPI';
import '../App.css';
import NavBar from '../components/NavBar'; // onde está escrito valor total do carinho tem quem implementar a somatoría do
// banco de dados,

export default function Products() {
  // trocar a linha 39 e 42 pelo valor total do carrinho,na linha 42 manter o .toFixed...replace('.', ',')
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getAll = async () => {
    const allProducts = await getProducts();
    setProducts(allProducts.data);
  };
  useEffect(() => getAll(), []);
  return (
    <div>
      <NavBar />
      <Header isProductPage />
      <section>
        {products.map(({ id, name, price, url_image: urlImage }) => (
          <Product
            key={ id }
            id={ id }
            name={ name }
            price={ price.replace(/\./, ',') }
            urlImage={ urlImage }
          />
        ))}
      </section>
      <div id="car-button">
        <button
          data-testid="customer_products__button-cart"
          onClick={ () => navigate('/customer/products') }
          type="button"
          disabled
        >
          Ver Carrinho: R$
          valor total do carrinho
        </button>
        <span data-testid="customer_products__checkout-bottom-value">
          preçototal.toFixed(2).replace
        </span>
      </div>
    </div>
  );
}
