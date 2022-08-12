import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import TableCheckout from '../components/TableCheckout';
import { getSellers, getUser, saveSale } from '../helpers/fetchAPI';
import formatCurrency from '../helpers/formatCurrency';
import { getCart, getLocalUser, removeItem } from '../helpers/localStore';

export default function Checkout() {
  const [cart, setCart] = useState(getCart());
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState();

  const getAllSellers = async () => {
    const res = await getSellers();
    setSellers(res.data);
  };

  const handleSubmit = async () => {
    const user = await getUser(getLocalUser().token);

    const sale = {
      deliveryAddress: address,
      deliveryNumber: number,
      sellerId: seller,
      userId: user.id,
      totalPrice: cart.total.toFixed(2),
      products: getCart().items,
    };

    await saveSale(getLocalUser().token, sale);
  };

  useEffect(() => getAllSellers());

  const removeProduct = (id) => {
    removeItem(id);
    setCart(getCart());
  };

  return (
    <div>
      <Header />
      <div>
        <h4>Finalizar Pedido</h4>
        <table>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
            <td>Remover item</td>
          </tr>
          {cart.items ? cart.items.map(({ id, name, price, value }, index) => (
            <TableCheckout
              key={ index }
              id={ id }
              index={ index }
              name={ name }
              price={ price }
              value={ value }
              removeProduct={ removeProduct }
            />
          )) : 'test'}
        </table>
        <aside data-testid="customer_checkout__element-order-total-price">
          Total:
          {formatCurrency(cart.total.toFixed(2))}
        </aside>
        <h4>Detalhes de Endereço para Entrega</h4>
        <form>
          <label htmlFor="select-seller">
            P. vendedora responsavel:
            <select
              data-testid="customer_checkout__select-seller"
              id="select-seller"
              onChange={ (e) => setSeller(e.target.value) }
              value={ seller }
            >
              {
                sellers.length > 0 && (
                  sellers.map((sellerData) => (
                    <option key={ `seller-${sellerData.id}` } value={ sellerData.id }>
                      {sellerData.name}
                    </option>
                  ))
                )
              }
            </select>
          </label>
          <label htmlFor="endereco">
            Endereço
            <input
              type="text"
              name="endereco"
              data-testid="customer_checkout__input-address"
              placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
              onChange={ (e) => setAddress(e.target.value) }
              value={ address }
            />
          </label>
          <label htmlFor="numero">
            Número
            <input
              type="text"
              name="numero"
              data-testid="customer_checkout__input-addressNumber"
              placeholder="198"
              onChange={ (e) => setNumber(e.target.value) }
              value={ number }
            />
          </label>
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ handleSubmit }
          >
            FINALIZAR PEDIDO
          </button>
        </form>

      </div>
    </div>
  );
}
