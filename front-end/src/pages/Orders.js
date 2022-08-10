import React, { useEffect, useState } from 'react';
import Order from '../components/Order';
import { getLocalUser } from '../helpers/localStore';
import { getSales } from '../helpers/fetchAPI';

function Orders() {
  const [sales, setSales] = useState([]);
  const getAll = async () => {
    const response = await getSales(getLocalUser().token);
    setSales(response.data);
  };

  useEffect(() => getAll(), []);

  return (
    <div>
      {
        sales.length > 0 && (
          sales.map((sale) => {
            const date = new Date(sale.saleDate).toLocaleDateString();
            const price = sale.totalPrice.toLocaleString('pr-br', {
              style: 'currency',
              currency: 'BRL',
            });
            return (
              <Order
                id={ sale.id }
                status={ sale.status }
                saleDate={ date }
                totalPrice={ price }
                key={ `order-id-${sale.id}` }
              />
            );
          })
        )
      }
    </div>
  );
}

export default Orders;
