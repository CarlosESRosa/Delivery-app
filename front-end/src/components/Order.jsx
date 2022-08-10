import React from 'react';
import PropTypes from 'prop-types';

export default function Order({ id, status, saleDate, totalPrice }) {
  return (
    <div>
      <section data-testId={ `customer_orders__element-order-id-${id}` }>
        { id }
      </section>

      <section data-testId={ `customer_orders__element-delivery-status-${id}` }>
        { status }
      </section>

      <section>
        <section data-testId={ `customer_orders__element-order-date-${id}` }>
          { saleDate }
        </section>

        <section data-testId={ `customer_orders__element-card-price-${id}` }>
          { totalPrice }
        </section>
      </section>
    </div>
  );
}

Order.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
}.isRequired;
