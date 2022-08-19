import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Order from '../components/Order';
import { getLocalUser } from '../helpers/localStore';
import { getSales } from '../helpers/fetchAPI';
import Header from '../components/Header';
import '../styles/pages/Orders.css';

function Orders() {
  const [sales, setSales] = useState([]);
  const { pathname } = useLocation();
  const getAll = async () => {
    const response = await getSales(getLocalUser().token);
    setSales(response.data);
  };

  useEffect(() => getAll(), []);
  if (pathname.includes('seller') && sales.length === 0) {
    return (
      <div>
        {
          pathname.includes('seller')
            ? <Header />
            : <Header isProductPage />
        }
        <h3>
          Você ainda nao possui nenhum pedido, ops..
        </h3>
      </div>
    );
  }

  if (pathname.includes('customer') && sales.length === 0) {
    return (
      <div>
        {
          pathname.includes('seller')
            ? <Header />
            : <Header isProductPage />
        }
        <h3>
          Você ainda nao fez nenhuma compra, ops..
        </h3>
      </div>
    );
  }
  return (
    <div>
      {
        pathname.includes('seller')
          ? <Header />
          : <Header isProductPage />
      }
      <div className="orders-container">
        {
          sales.length > 0 && (
            sales.map((sale) => {
              const date = new Date(sale.saleDate).toLocaleDateString('pt-br');
              const price = sale.totalPrice.toLocaleString('pr-br', {
                style: 'currency',
                currency: 'BRL',
              });
              return (
                <Link
                  to={
                    pathname.includes('seller')
                      ? `/seller/orders/${sale.id}`
                      : `/customer/orders/${sale.id}`
                  }
                  key={ `order-id-${sale.id}` }
                >
                  <Order
                    id={ sale.id }
                    status={ sale.status }
                    saleDate={ date }
                    totalPrice={ price }
                    seller={ pathname.includes('seller') }
                    address={ `${sale.deliveryAddress}, ${sale.deliveryNumber}` }
                  />
                </Link>
              );
            })
          )
        }
      </div>
    </div>
  );
}

export default Orders;
