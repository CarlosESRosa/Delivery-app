import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLocalUser } from '../helpers/localStore';
import Header from '../components/Header';
import { getSaleById, updateSaleStatus } from '../helpers/fetchAPI';
import OrderDetailsTable from '../components/OrderDetailsTable';

function Order() {
  const [saleData, setSaleData] = useState({});
  const { id } = useParams();

  const getData = async () => {
    const response = await getSaleById(getLocalUser().token, id);
    setSaleData(response.data);
  };

  const handleCheck = () => {
    updateSaleStatus(getLocalUser().token, id, 'Entregue');
  };

  useEffect(() => getData(), []);

  const LABEL_OR_TEST_ID = 'customer_order_details__element-order-details-label-order-id';
  const LABEL_NAME = 'customer_order_details__element-order-details-label-seller-name';
  const LABEL_DATE = 'customer_order_details__element-order-details-label-order-date';
  const STATUS = 'customer_order_details__element-order-details-label-delivery-status';
  const LABEL_CHECK = 'customer_order_details__button-delivery-check';
  const TOTAL_PRICE = 'customer_order_details__element-order-total-price';

  return (
    <>
      <Header />
      <main>
        <h2>Detalhe do pedido</h2>
        {saleData.seller && (
          <section>
            <header>
              <p data-testid={ `${LABEL_OR_TEST_ID}${id}` }>
                { `PEDIDO ${saleData.id}` }
              </p>
              <p data-testid={ LABEL_NAME }>
                { `P. Vend: ${saleData.seller.name}` }
              </p>

              <p data-testid={ LABEL_DATE }>
                { new Date(saleData.saleData).toLocaleDateString() }
              </p>

              <p data-testid={ STATUS }>
                { saleData.status }
              </p>

              <button
                data-testid={ LABEL_CHECK }
                onClick={ handleCheck }
                type="button"
              >
                Marcar como entregue
              </button>
            </header>

            <OrderDetailsTable products={ saleData.sales } />

            <h3 data-testid={ TOTAL_PRICE }>
              { `Total: ${saleData.totalPrice.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}` }
            </h3>
          </section>
        )}
        ;
        {/*

        <section>
          <header>
            <p data-testid={ `${LABEL_ORDER_TEST_ID}${id}` }>
              { `PEDIDO ${saleData.id}` }
            </p>
            <p data-testid={ LABEL_NAME }>
              { `P. Vend: ${saleData.seller.name}` }
            </p>

            <p data-testid={ LABEL_DATE }>
              { new Date(sale.saleDate).toLocaleDateString() }
            </p>

            <p data-testid={ STATUS }>
              { saleData.status }
            </p>

            <button
              data-testid={ LABEL_CHECK }
              onClick={ handleCheck }
              type="button"
            >
              Marcar como entregue
            </button>
          </header>

          <OrderDetailsTable products={ saleData.sales } />

          <h3 data-testid={ TOTAL_PRICE }>
            { `Total: ${saleData.totalPrice.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}` }
          </h3>
        </section>
        */}
      </main>
    </>
  );
}

export default Order;
