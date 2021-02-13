import axios from 'axios';

const request = async ({ url, options }) => {
  let config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    params: options.params,
  };

  return axios.get(url, config);
};

export default request;
