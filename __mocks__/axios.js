/* let __value = { data: {} };
const axiosFetch = jest.fn(() => __value);
axiosFetch.__setValue = (v) => (__value = v);
export default axiosFetch; */

let __value = { data: {} };
const axios = {
  get: jest.fn(() => Promise.resolve(__value)),
  create: () => axios,
  defaults: {
    adapter: {},
  },
};

axios.__setValue = (v) => (__value = v);

export default axios;
