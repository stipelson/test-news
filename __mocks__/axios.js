/* let __value = { data: {} };
const axiosFetch = jest.fn(() => __value);
axiosFetch.__setValue = (v) => (__value = v);
export default axiosFetch; */

let __value = { data: {} };
const axios = {
  get: jest.fn((url) => {
    if (url !== 'Test error') {
      return Promise.resolve(__value);
    }
    // console.log('error from axios')
    throw 'Bad url';
  }),
  create: () => axios,
  defaults: {
    adapter: {},
  },
};

axios.__setValue = (v) => (__value = v);

export default axios;
