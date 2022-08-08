import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const addUser = async (data) => {
  const url = '/user';
  // const res = await axios({ url, method: 'post', data, baseURL });
  const body = JSON.stringify(data);
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json',
  };
  const apiData = await fetch(baseURL + url, { method, body, headers });
  const res = await apiData.json();
  console.log(res);
  return res;
};

export const getUser = async (data) => {
  const url = '/user/me';
  const res = await axios({ url, data, baseURL });
  console.log(res);
  return res;
};

export const login = async (data) => {
  const url = '/login';
  const res = await axios.post(baseURL + url, data);
  console.log(res);
  return res;
};

export const getProducts = async () => {
  const url = '/product';
  const res = await axios({ url, baseURL });
  console.log(res);
  return res;
};
