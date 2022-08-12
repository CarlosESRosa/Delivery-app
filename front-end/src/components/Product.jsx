import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { updateCart } from '../helpers/localStore';

export default function Product(props) {
  const { id, name, price, urlImage, handleCart, prevQuantity } = props;
  const [quantity, setQuantity] = useState(prevQuantity);
  const formatPrice = (value) => Number(value.replace(',', '.'));
  const handleQuantity = ({ target }) => {
    setQuantity(Number(target.value));
    const total = updateCart(
      { id, name, price: formatPrice(price), value: target.value },
    );
    handleCart(total);
  };
  const increaseQuantity = () => {
    setQuantity((prev) => {
      const value = prev + 1;
      const total = updateCart({ id, name, price: formatPrice(price), value });
      handleCart(total);
      return value;
    });
  };
  const decreaseQuantity = () => {
    setQuantity((prev) => {
      const value = prev ? prev - 1 : 0;
      const total = updateCart({ id, price: formatPrice(price), value });
      handleCart(total);
      return value;
    });
  };
  return (
    <div>
      <aside data-testid={ `customer_products__element-card-price-${id}` }>
        { price }
      </aside>
      <section>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
        />
        <h5 data-testid={ `customer_products__element-card-title-${id}` }>{ name }</h5>
      </section>
      <footer>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          onClick={ () => decreaseQuantity() }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          value={ quantity }
          onChange={ handleQuantity }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ () => increaseQuantity() }
        >
          +
        </button>
      </footer>
    </div>
  );
}

Product.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  urlImage: PropTypes.string,
  prevQuantity: PropTypes.number,
  handleCart: PropTypes.func,
}.isRequired;
