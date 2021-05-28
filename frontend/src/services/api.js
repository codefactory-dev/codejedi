import axios from 'axios';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: '/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const tokens = localStorage.getItem('tokens');
    if (tokens !== 'undefined'){
      const parsed = JSON.parse(tokens)
      config.headers.Authorization =  parsed.token ? `Bearer ${parsed.token}` : '';
    }
    return config;
  });

  return instance;
};

export default fetchClient();