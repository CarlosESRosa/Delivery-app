import React from 'react';
import PropTypes from 'prop-types';

export default function TableCheckout({ id, name, price, value, index, removerProduto }) {
  return (
    <tr>
      <td data-testid={ `customer_checkout__element-order-table-item-number-${index}` }>
        {index + 1}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>
        {name}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-quantity-${index}` }>
        {value}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }>
        {price.replace(/\./, ',')}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }>
        {(price * value).toFixed(2).replace(/\./, ',')}
      </td>
      <td>
        <button
          type="button"
          data-testid={ `customer_checkout__element-order-table-remove-${index}` }
          onClick={ () => removerProduto(id) }
        >
          Remover
        </button>
      </td>
    </tr>
  );
}

TableCheckout.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  value: PropTypes.number,
  removerProduto: PropTypes.func,
}.isRequired;
