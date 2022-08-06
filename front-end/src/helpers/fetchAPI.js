import axios from 'axios';

const baseURL = 'https://localhost:3001';

export const addUser = async (data) => {
  const url = '/user';
  const res = await axios({ url, method: 'post', data, baseURL });
  console.log(res);
  return res;
};

export const getUser = async (data) => {
  const url = '/user/me';
  const res = await axios({ url, data, baseURL });
  console.log(res);
  return res;
};

export const getProducts = async () => {
  const url = '/product';
  const res = await axios({ url, baseURL });
  console.log(res);
  return res;
};
