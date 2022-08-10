import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Product from '../components/Product';
import { getProducts } from '../helpers/fetchAPI';

export default function Products() {
  // const products = [];
  const [products, setProducts] = useState([]);
  const getAll = async () => {
    const allProducts = await getProducts();
    setProducts(allProducts.data);
  };
  useEffect(() => getAll(), []);
  return (
    <div>
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
    </div>
  );
}
