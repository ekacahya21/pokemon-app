/* eslint-disable */
import _ from 'lodash';
import extend from 'lodash/extend';

import config from 'Config';
import request from 'Utils/request';

const urls = {
  landing_page_msisdn: 'sys/landing-page-msisdn',
};

const callAPI = (endpoint, method, headers = {}, params = {}, data = {}) => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  extend(headers, defaultHeaders);

  const options = {
    baseURL: config.api.host,
    url: endpoint,
    method,
    headers,
    data,
    params,
    timeout: config.api.timeout,
  };

  return request(options).then((response) => {
    const responseAPI = response.data && response.data.data;
    responseAPI.transaction_id = response.data && response.data.transaction_id;
    return responseAPI;
  });
};
