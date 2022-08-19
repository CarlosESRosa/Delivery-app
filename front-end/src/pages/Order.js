import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLocalUser } from '../helpers/localStore';
import Header from '../components/Header';
import { getSaleById, updateSaleStatus } from '../helpers/fetchAPI';
import OrderDetailsTable from '../components/OrderDetailsTable';
import '../styles/pages/Order.css';

function Order() {
  const [saleData, setSaleData] = useState({});
  const { id } = useParams();

  const handleCheck = () => {
    updateSaleStatus(getLocalUser().token, id, 'Entregue');
  };

  const getData = async () => {
    const response = await getSaleById(getLocalUser().token, id);
    setSaleData(response.data);
  };

  useEffect(() => getData(), []);
  useEffect(() => getData(), [saleData]);
  const LABEL_OR_TEST_ID = 'customer_order_details__element-order-details-label-order-id';
  const LABEL_NAME = 'customer_order_details__element-order-details-label-seller-name';
  const LABEL_DATE = 'customer_order_details__element-order-details-label-order-date';
  const STATUS = 'customer_order_details__element-order-details-label-delivery-status';
  const LABEL_CHECK = 'customer_order_details__button-delivery-check';
  const TOTAL_PRICE = 'customer_order_details__element-order-total-price';

  return (
    <>
      <Header isProductPage />
      <main className="page-order-detail">
        <h2>Detalhe do pedido</h2>
        {saleData.seller && (
          <section className="order-details-container">
            <header className="details-header">
              <p className="text-bold" data-testid={ `${LABEL_OR_TEST_ID}${id}` }>
                { `PEDIDO ${saleData.id}` }
              </p>
              <p data-testid={ LABEL_NAME }>
                { `P. Vend:
                ${saleData.seller.name}` }
              </p>

              <p className="text-bold" data-testid={ LABEL_DATE }>
                { new Date(saleData.saleDate).toLocaleDateString('pt-br') }
              </p>

              <p
                className={ `sale-status ${saleData.status
                  .split(' ').join('-').toLowerCase()}` }
                data-testid={ STATUS }
              >
                { saleData.status }
              </p>

              <button
                className="details-header entregue"
                data-testid={ LABEL_CHECK }
                onClick={ handleCheck }
                disabled={ saleData.status !== 'Em Trânsito' }
                type="button"
              >
                Marcar como entregue
              </button>
            </header>

            <OrderDetailsTable products={ saleData.sales } />

            <h3
              className="default-button default-primary-button"
              data-testid={ TOTAL_PRICE }
            >
              { saleData.totalPrice.toString().replace('.', ',') }
            </h3>
          </section>
        )}

      </main>
    </>
  );
}

export default Order;
