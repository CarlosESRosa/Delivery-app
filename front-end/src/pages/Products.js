import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import { getProducts } from '../helpers/fetchAPI';
import '../App.css';
import NavBar from '../components/NavBar'; // onde está escrito valor total do carinho tem quem implementar a somatoría do
// banco de dados,

export default function Products() {
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
      <section>
        {products.map(({ id, name, price, url_image: urlImage }) => (
          <Product
            key={ id }
            id={ id }
            name={ name }
            price={ price }
            urlImage={ urlImage }
          />
        ))}
      </section>
      <div id="car-button">
        <button
          onClick={ () => navigate('/customer/products') }
          type="button"
        >
          Ver Carrinho: R$
          valor total do carrinho
        </button>
      </div>
    </div>
  );
}
