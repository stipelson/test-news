import axios from 'axios';

const request = async ({ url, options = {} }) => {
  let fetchUrl = url;

  let config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    params: options.params,
  };

  return axios.get(fetchUrl, config);
};

export default request;
