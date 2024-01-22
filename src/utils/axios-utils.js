import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;

  const onSuccess = (response) => response;

  const onError = (error) => {
    // optionally catch errors and add additional logging here
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
