import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLocalUser } from '../helpers/localStore';
import Header from '../components/Header';
import { getSaleById, updateSaleStatus } from '../helpers/fetchAPI';
import SellerOrderDetailsTable from '../components/SellerOrderDetailsTable';

function SellerOrder() {
  const [saleData, setSaleData] = useState({
    id: 0,
    status: 'carregando',
    totalPrice: '0',
    sales: [],
  });
  const { id } = useParams();

  const getData = async () => {
    const response = await getSaleById(getLocalUser().token, id);
    setSaleData(response.data);
  };

  const handleCheck = (message) => {
    updateSaleStatus(getLocalUser().token, id, message);
  };

  useEffect(() => getData(), []);
  useEffect(() => getData(), [saleData]);

  const FIRST_TEST_ID = 'seller_order_details__element-order-details-label-order-id';
  const DISPATCH_LABEL = 'seller_order_details__button-dispatch-check';
  const LABEL_DATE = 'seller_order_details__element-order-details-label-order-date';
  const STATUS = 'seller_order_details__element-order-details-label-delivery-status';
  const LABEL_CHECK = 'seller_order_details__button-preparing-check';
  const TOTAL_PRICE = 'seller_order_details__element-order-total-price';

  return (
    <>
      <Header />
      <main className="page-order-detail">
        <h2>Detalhe do pedido</h2>
        <section className="order-details-container">
          <header>
            <p data-testid={ FIRST_TEST_ID }>
              { `PEDIDO ${saleData.id}` }
            </p>
            <p data-testid={ LABEL_DATE }>
              {new Date(saleData.saleDate).toLocaleDateString('pt-br')}
            </p>

            <p
              className={ `sale-status ${saleData.status
                .split(' ').join('-').toLowerCase()}` }
              data-testid={ STATUS }
            >
              { saleData.status }
            </p>

            <button
              className="default-tertiary-button"
              data-testid={ LABEL_CHECK }
              onClick={ () => handleCheck('Preparando') }
              disabled={ saleData.status !== 'Pendente' }
              type="button"
            >
              PREPARAR PEDIDO
            </button>

            <button
              data-testid={ DISPATCH_LABEL }
              onClick={ () => handleCheck('Em Trânsito') }
              disabled={ saleData.status !== 'Preparando' }
              type="button"
            >
              SAIU PARA ENTREGA
            </button>
          </header>

          <SellerOrderDetailsTable products={ saleData.sales } />

          <h3
            className="default-button default-primary-button"
            data-testid={ TOTAL_PRICE }
          >
            { saleData.totalPrice.toString().replace('.', ',') }
          </h3>
        </section>
      </main>
    </>
  );
}

export default SellerOrder;
