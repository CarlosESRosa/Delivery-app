import React from 'react';
import PropTypes from 'prop-types';

export default function OrderDetailsTable({ products }) {
  const INDEX = 'customer_order_details__element-order-table-item-number-';
  const DESCRIPTION = 'customer_order_details__element-order-table-name-';
  const QUANTITY = 'customer_order_details__element-order-table-quantity-';
  const PRICE = 'customer_order_details__element-order-table-sub-total-';
  const SUB_TOTAL = 'customer_order_details__element-order-total-price-';

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unit</th>
          <th>Sub-total</th>
        </tr>
      </thead>

      <tbody>
        {
          products.map((product, index) => (
            <tr key={ `product-${index}` }>
              <td data-testid={ `${INDEX}${index}` }>
                {index}
              </td>
              <td data-testid={ `${DESCRIPTION}${index}` }>
                {product.name}
              </td>
              <td data-testid={ `${QUANTITY}${index}` }>
                {product.SaleProduct.quantity}
              </td>
              <td data-testid={ `${PRICE}${index}` }>
                { product.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                }) }
              </td>
              <td data-testid={ `${SUB_TOTAL}${index}` }>
                { (product.price * product.SaleProduct.quantity).toLocaleString(
                  'pr-br',
                  {
                    style: 'currency',
                    currency: 'BRL',
                  },
                ) }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

OrderDetailsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])),
}.isRequired;
