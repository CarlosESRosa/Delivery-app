import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Product(props) {
  const { id, name, price, urlImage } = props;
  const [quantity, setQuantity] = useState(0);
  const handleQuantity = ({ target }) => setQuantity(target.value);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => prev - 1);
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
}.isRequired;
