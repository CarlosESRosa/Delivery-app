export const saveUser = (user) => {
  const userData = JSON.stringify(user);
  localStorage.setItem('user', userData);
};

export const getLocalUser = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
};

export const cleanUserData = () => {
  localStorage.setItem('user', '');
};
