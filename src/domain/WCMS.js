import extend from 'lodash/extend';

import config from '../../config';
import request from '../utils/request';

const urls = {
  assetImages: '/v1/asset/web',
  translations: '/translation/all/web',
};

const callAPI = (endpoint, method, headers = {}, params = {}, data = {}) => {
  const defaultHeaders = {
    Accept: 'application/json',
  };
  extend(headers, defaultHeaders);

  const options = {
    baseURL: config.wcms.host + config.wcms.api,
    url: endpoint,
    method,
    headers,
    data,
    params,
    timeout: config.wcms.timeout,
    skipAuthRefresh: true,
  };

  return request(options).then((response) => response.data);
};

export const getTranslations = () => callAPI(urls.translations, 'get');

export const getAssetImages = () => callAPI(urls.assetImages, 'get');
