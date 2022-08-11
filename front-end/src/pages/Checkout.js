import React from 'react';
import Header from '../components/Header';
import TableCheckout from '../components/TableCheckout';
import { getCart } from '../helpers/localStore';

export default function Checkout() {
  const cart = getCart();
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
          {cart.items ? cart.items.map(({ name, price, value }, index) => (
            <TableCheckout
              key={ index }
              index={ index }
              name={ name }
              price={ price }
              value={ value }
            />
          )) : 'test'}
        </table>
        <aside data-testid="customer_checkout__element-order-total-price">
          Total:R$
          {cart.total.toFixed(2)}
        </aside>
        <h4>Detalhes de Endereço para Entrega</h4>
        <form>

          {/*
        <label htmlFor="">
          P. vendedora responsavel:
          <input />
        </label>
        */}
          <label htmlFor="endereco">
            Endereço
            <input
              type="text"
              name="endereco"
              data-testid="customer_checkout__input-address"
              placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            />
          </label>
          <label htmlFor="numero">
            Número
            <input
              type="text"
              name="numero"
              data-testid="customer_checkout__input-addressNumber"
              placeholder="198"
            />
          </label>
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
          >
            FINALIZAR PEDIDO
          </button>
        </form>

      </div>
    </div>
  );
}
