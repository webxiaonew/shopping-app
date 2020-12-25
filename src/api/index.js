import Axios from 'axios';
import baseURL, { URLS } from './URLS';

const appkey = 'yangbashan_1608226030603';
const request = Axios.create({
  baseURL,
  params: {
    appkey,
  },
});
request.interceptors.response.use((value) => value.data);
const getSideList = (type) => request.get(URLS.getSide, { params: { type } });
const getGoodsList = (type, size, sort, page) => request.get(URLS.getGoodsList, {
  params: {
    type,
    size,
    sort,
    page,
  },
});
export default {
  getSideList,
  getGoodsList,
};
