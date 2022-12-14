export const saveUser = (user) => {
  const userData = JSON.stringify(user);
  localStorage.setItem('user', userData);
};

export const getLocalUser = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
};

export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return JSON.parse(cart) || { total: 0, items: [] };
};

export const updateCart = ({ id, name, price, value }) => {
  const { items, total } = getCart();
  const otherItems = items.filter((item) => item.id !== id);
  const prevItem = items.find((item) => item.id === id);
  const prevPrice = prevItem ? (prevItem.price * prevItem.value) : 0;
  const totalPrice = (total + (price * value) - prevPrice).toFixed(2);
  const newCart = {
    items: [...otherItems, { id, price, value, name }],
    total: parseFloat(totalPrice),
  };
  localStorage.setItem('cart', JSON.stringify(newCart));
  return totalPrice;
};

export const clearCart = () => {
  const cartClear = {
    items: [],
    total: 0.00,
  };
  localStorage.setItem('cart', JSON.stringify(cartClear));
};

export const prevQuantity = (id) => {
  const { items } = getCart();
  const prevItem = items.find((item) => item.id === id);
  const value = prevItem ? prevItem.value : 0;
  return value;
};

export const cleanUserData = () => {
  localStorage.setItem('user', '');
  localStorage.setItem('cart', '');
};

export const removeItem = (id) => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const product = cart.items.find((item) => item.id === id);
  cart.total -= (product.price * product.value);
  const newItems = cart.items.filter((item) => item.id !== id);
  cart.items = newItems;
  localStorage.setItem('cart', JSON.stringify(cart));
};
