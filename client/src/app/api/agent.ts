import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../layout/router/Routes";
import { store } from "../store/configureStore";
import { create } from "domain";
import { PaginateResponse } from "../layout/models/pagination";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") await sleep();

    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginateResponse(
        response.data,
        JSON.parse(pagination)
      );
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title || "Unauthorised");
        break;
      case 403:
        toast.error("Ovo nije dozvoljeno!");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });

        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
};

function createFormData(item: any) {
  let formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

const Admin = {
  createProduct: (product: any) =>
    requests.postForm("products", createFormData(product)),
  updateProduct: (product: any) =>
    requests.putForm("products", createFormData(product)),
  deleteProduct: (id: number) => requests.delete(`products/${id}`),
};

const Catalog = {
  list_biciklizam: () => requests.get("products/biciklizam"),
  list_skijanje: () => requests.get("products/skijanje"),
  list_kajak: () => requests.get("products/kajak"),
  list_kvadovi: () => requests.get("products/kvadovi"),
  list_kampovanje: () => requests.get("products/kampovanje"),
  list_e_biciklo: () => requests.get("products/e_biciklo"),
  list_planinarenje: () => requests.get("products/planinarenje"),
  details: (id: number) => requests.get(`products/${id}/products`),
  fetchFilters: () => requests.get("products/filters"),
};

const TestError = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number, kolicina = 1) =>
    requests.post(`basket?productId=${productId}&kolicina=${kolicina}`, {}),
  removeItem: (productId: number, kolicina = 1) =>
    requests.delete(`basket?productId=${productId}&kolicina=${kolicina}`),
};

const Account = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: (values: any) => requests.post("account/currentUser", values),
  fetchAddress: () => requests.get("account/savedAddress"),
};

const Orders = {
  list: () => requests.get("orders"),
  listAll: () => requests.get("orders/AllOrders"),
  fetch: (id: number) => requests.get(`orders/${id}`),
  create: (values: any) => requests.post("orders", values),
};

const Payments = {
  createPaymentIntent: () => requests.post("payments", {}),
};

const agent = {
  Catalog,
  TestError,
  Basket,
  Account,
  Orders,
  Payments,
  Admin,
};
export default agent;
