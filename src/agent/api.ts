import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://forsa-staging.bit68.com/api/v1/";
const responseBody = (response: AxiosResponse) => response.data;
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
};

const main = {
  getSelectors: () => requests.get("stores/mysectors/"),
  getBrandsBySelector: ({
    categoryId,
    page,
  }: {
    categoryId: string;
    page: number;
  }) => requests.get(`stores/mystores/?page=${page}&sector=${categoryId}`),

  getMyService: () => requests.get("onetransaction/myservicetypes/"),
  getOffers: () => requests.get("stores/myoffers/"),
};

const agent = {
    main,
};

export default agent;
