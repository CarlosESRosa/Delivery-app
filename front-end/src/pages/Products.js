import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Product from '../components/Product';
import { getProducts } from '../helpers/fetchAPI';
import '../App.css';
import { getCart, prevQuantity } from '../helpers/localStore';
import '../styles/pages/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const navigate = useNavigate();
  const getAll = async () => {
    setCartTotalPrice(getCart().total);
    const allProducts = await getProducts();
    setProducts(allProducts.data);
  };
  useEffect(() => getAll(), []);
  const handleCart = (total) => setCartTotalPrice(total);
  return (
    <div>
      <Header isProductPage />
      <section className="products-container">
        {products.map(({ id, name, price, url_image: urlImage }) => (
          <Product
            key={ id }
            id={ id }
            name={ name }
            price={ price }
            urlImage={ urlImage }
            handleCart={ handleCart }
            prevQuantity={ prevQuantity(id) }
          />
        ))}
      </section>
      <div id="car-button" className="car-button">
        <button
          data-testid="customer_products__button-cart"
          onClick={ () => navigate('/customer/checkout') }
          type="button"
          disabled={ cartTotalPrice === 0 }
        >
          Ver Carrinho: R$
          valor total do carrinho
        </button>
        <span data-testid="customer_products__checkout-bottom-value">
          { cartTotalPrice.toString().replace('.', ',') }
        </span>
      </div>
    </div>
  );
}
