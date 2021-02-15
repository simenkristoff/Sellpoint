import { getToken } from './helpers';

const API_URL = process.env.API_URL as string;

/**
 * Handles potential errors sent from the API
 * @param {Response} response response from API request
 */
function handleResponse(response: Response) {
  const res = response.json().then(data => {
    if (!response.ok) {
      const err = data[Object.keys(data)[0]];

      throw Error(err);
    }

    return data;
  });

  return res;
}

/**
 * Wrapper function for API requests
 * @param {string} method http method ['GET', 'POST', 'UPDATE', 'DELETE']
 * @param {string} path api path
 * @param data data to be sent
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function apiCaller(method: string, path: string, data?: any) {
  return fetch(`${API_URL}/${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: 'http://localhost:3000',
      Authorization: `JWT ${getToken()?.token}`,
    },
    body: data ? JSON.stringify(data) : null,
  })
    .then(handleResponse)
    .catch();
}
