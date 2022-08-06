export const saveUser = ({ name, role, email, token }) => {
  localStorage.setItem('name', name);
  localStorage.setItem('role', role);
  localStorage.setItem('email', email);
  localStorage.setItem('token', token);
};

export const getUser = () => {
  const name = localStorage.setItem('name');
  const role = localStorage.setItem('role');
  const email = localStorage.setItem('email');
  const token = localStorage.setItem('token');
  return { name, role, email, token };
};

export const cleanUserData = () => {
  localStorage.setItem('name', '');
  localStorage.setItem('role', '');
  localStorage.setItem('email', '');
  localStorage.setItem('token', '');
};
