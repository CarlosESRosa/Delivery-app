import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const addUser = async (data) => {
  const url = '/user';
  const res = await axios({ url, method: 'post', data, baseURL });
  // const body = JSON.stringify(data);
  // const method = 'POST';
  // const headers = {
  //   'Content-Type': 'application/json',
  // };
  // const apiData = await fetch(baseURL + url, { method, body, headers });
  // const res = await apiData.json();
  console.log(res);
  return res;
};

export const getUser = async (token) => {
  const url = '/user/me';
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.get(baseURL + url, config);
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
  const res = await axios(baseURL + url);
  console.log(res);
  return res;
};

export const getSales = async (token) => {
  const url = '/sale';
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios(baseURL + url, config);
  return res;
};

export const getSaleById = async (token, id) => {
  const url = `/sale/${id}`;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios(baseURL + url, config);
  return res;
};

export const updateSaleStatus = async (token, id, status) => {
  const url = `/sale/${id}`;
  const config = {
    headers: {
      Authorization: token,
    },
    body: {
      status,
    },
  };
  const res = await axios.put(baseURL + url, config);
  return res;
};
