import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLocalUser } from '../helpers/localStore';
import Header from '../components/Header';
import { getSaleById } from '../helpers/fetchAPI';
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

  const handleCheck = () => {
    // updateSaleStatus(getLocalUser().token, id, 'Entregue');
    console.log('feature pendente');
  };

  useEffect(() => getData());

  const FIRST_TEST_ID = 'seller_order_details__element-order-details-label-order-id';
  const DISPATCH_LABEL = 'seller_order_details__button-dispatch-check';
  const LABEL_DATE = 'seller_order_details__element-order-details-label-order-date';
  const STATUS = 'seller_order_details__element-order-details-label-delivery-status';
  const LABEL_CHECK = 'seller_order_details__button-preparing-check';
  const TOTAL_PRICE = 'seller_order_details__element-order-total-price';

  return (
    <>
      <Header />
      <main>
        <h2>Detalhe do pedido</h2>
        <section>
          <header>
            <p data-testid={ FIRST_TEST_ID }>
              { `PEDIDO ${saleData.id}` }
            </p>

            <p data-testid={ LABEL_DATE }>
              {/* { new Date(sale.saleDate).toLocaleDateString() } */}
              11/11/2011
            </p>

            <p data-testid={ STATUS }>
              { saleData.status }
            </p>

            <button
              data-testid={ LABEL_CHECK }
              onClick={ handleCheck }
              type="button"
            >
              PREPARAR PEDIDO
            </button>

            <button
              data-testid={ DISPATCH_LABEL }
              onClick={ handleCheck }
              type="button"
            >
              SAIU PARA ENTREGA
            </button>
          </header>

          <SellerOrderDetailsTable products={ saleData.sales } />

          <h3 data-testid={ TOTAL_PRICE }>
            { `Total: ${saleData.totalPrice.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}` }
          </h3>
        </section>
      </main>
    </>
  );
}

export default SellerOrder;