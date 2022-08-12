import React from 'react';
import PropTypes from 'prop-types';

export default function Order({
  id,
  status,
  saleDate,
  totalPrice,
  seller,
  address,
}) {
  return (
    <div>
      <section
        data-testid={
          seller
            ? `seller_orders__element-order-id-${id}`
            : `customer_orders__element-order-id-${id}`
        }
      >
        { id }
      </section>

      <section
        data-testid={
          seller
            ? `seller_orders__element-delivery-status-${id}`
            : `customer_orders__element-delivery-status-${id}`
        }
      >
        { status }
      </section>

      <section>
        <section
          data-testid={
            seller
              ? `seller_orders__element-order-date-${id}`
              : `customer_orders__element-order-date-${id}`
          }
        >
          { saleDate }
        </section>

        <section
          data-testid={
            seller
              ? `51: seller_orders__element-card-price-${id}`
              : `customer_orders__element-card-price-${id}`
          }
        >
          { totalPrice }
        </section>

        {
          seller && (
            <section data-testid={ `seller_orders__element-card-address-${id}` }>
              { address }
            </section>
          )
        }
      </section>
    </div>
  );
}

Order.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
  seller: PropTypes.bool,
  address: PropTypes.string,
}.isRequired;
