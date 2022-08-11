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
  // value é a quantidade
  const { items, total } = getCart();
  const otherItems = items.filter((item) => item.id !== id);
  const prevItem = items.find((item) => item.id === id);
  const prevPrice = prevItem ? (prevItem.price * prevItem.value) : 0;
  const totalPrice = total + (price * value) - prevPrice;
  const newCart = {
    items: [...otherItems, { id, price, value, name }],
    total: totalPrice,
  };
  localStorage.setItem('cart', JSON.stringify(newCart));
  return totalPrice;
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
