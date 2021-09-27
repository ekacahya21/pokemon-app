/*  eslint-disable no-param-reassign */
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import qs from 'query-string';

import { showPopup } from 'Containers/App/actions';

import store from '../configureStore';

// request interceptor
axios.interceptors.request.use((reqConfig) => {
  if (reqConfig.headers.refreshTokenCalled === true && reqConfig.headers.refreshTokenFailed === true) {
    throw new axios.Cancel('Refresh token failed');
  }

  // * redirect if request contain isRedirect headers
  if (reqConfig.headers.isRedirect) {
    delete reqConfig.headers.isRedirect;
    const url = `${reqConfig.baseURL}${reqConfig.url}?${qs.stringify(reqConfig.params)}`;
    window.location.href = url;
  }
  return reqConfig;
});

// response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { dispatch } = store;
      const { response } = error;
      const state = store.getState();
      const { skipApiErrorPopup } = state.app;

      if (response.status >= 404 && !skipApiErrorPopup) dispatch(showPopup());
    }
    return Promise.reject(error);
  }
);

export default function (options, requestOptions = {}) {
  const { useFetch } = requestOptions;
  if (useFetch) {
    const queryParams = (!isEmpty(options.params) && `?${qs.stringify(options.params)}`) || '';
    return fetch(`${options.baseURL}${options.url}${queryParams}`, {
      method: options.method,
      headers: options.headers,
      body: (!isEmpty(options.data) && options.data) || null,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => {
      if (res.redirected) {
        return res.url;
      }
      return res.json();
    });
  }
  return axios(options);
}
