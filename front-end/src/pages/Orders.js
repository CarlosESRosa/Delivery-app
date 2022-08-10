import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Order from '../components/Order';
import { getLocalUser } from '../helpers/localStore';
import { getSales } from '../helpers/fetchAPI';
import Header from '../components/Header';

function Orders() {
  const [sales, setSales] = useState([]);
  const getAll = async () => {
    const response = await getSales(getLocalUser().token);
    setSales(response.data);
  };

  useEffect(() => getAll(), []);

  return (
    <div>
      <Header />
      {
        sales.length > 0 && (
          sales.map((sale) => {
            const date = new Date(sale.saleDate).toLocaleDateString();
            const price = sale.totalPrice.toLocaleString('pr-br', {
              style: 'currency',
              currency: 'BRL',
            });
            return (
              <Link to={ `/customer/orders/${sale.id}` } key={ `order-id-${sale.id}` }>
                <Order
                  id={ sale.id }
                  status={ sale.status }
                  saleDate={ date }
                  totalPrice={ price }
                />
              </Link>
            );
          })
        )
      }
    </div>
  );
}

export default Orders;
