import { AuthToken } from '../interface';
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

export default function apiCaller(method: string, path: string, data?: any, handleErrors = true) {
  const authToken: AuthToken | undefined = getToken();
  const requestHeader: HeadersInit = new Headers();
  requestHeader.set('Accept', 'application/json');
  requestHeader.set('Content-Type', 'application/json');
  requestHeader.set('Origin', 'http://localhost:3000');
  if (authToken) requestHeader.set('Authorization', `Bearer ${authToken.token}`);

  return fetch(`${API_URL}/${path}`, {
    method,
    headers: requestHeader,
    body: data ? JSON.stringify(data) : null,
  })
    .then(response => {
      if (handleErrors) {
        return handleResponse(response);
      }
    })
    .catch();
}

/**
 * Wrapper function for API requests
 * @param {string} method http method ['GET', 'POST', 'UPDATE', 'DELETE']
 * @param {string} path api path
 * @param data data to be sent
 */

export function multipartApiCaller(method: string, path: string, data?: any, handleErrors = true) {
  const authToken: AuthToken | undefined = getToken();
  const requestHeader: HeadersInit = new Headers();
  //requestHeader.set('Content-Type', 'multipart/form-data');
  requestHeader.set('Origin', 'http://localhost:3000');
  if (authToken) requestHeader.set('Authorization', `Bearer ${authToken.token}`);

  const formData = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key]) && data[key][0] instanceof File) {
      const fileList: File[] = data[key];
      fileList.forEach(file => {
        formData.append(key, file);
      });
    } else {
      formData.append(key, data[key]);
    }
  }

  return fetch(`${API_URL}/${path}`, {
    method,
    headers: requestHeader,
    body: formData,
  })
    .then(response => {
      if (handleErrors) {
        return handleResponse(response);
      }
    })
    .catch();
}
