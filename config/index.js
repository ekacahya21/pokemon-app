const config = {
  appVersion: process.env.APP_VERSION,
  api: {
    host: process.env.API_HOST,
    timeout: process.env.API_TIMEOUT,
    key: process.env.API_KEY,
    hashKey: process.env.API_HASH_KEY,
    clientId: process.env.API_CLIENTID,
    encryption: {
      algorithm: process.env.API_CIPHERALGORITHM,
      validity: process.env.API_VALIDITY,
    },
  },
};

export default config;
