import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type Method,
} from "axios";

const BASE_URLS = {
  default: "http://localhost:3000/api/v1/",
};

const createAxiosInstance = (
  base: keyof typeof BASE_URLS = "default",
): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URLS[base],
    // headers: {
    //     "Content-Type": "application/json",
    // },
    withCredentials: true,
  });
};

export const apiCall = async (
  base: keyof typeof BASE_URLS,
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
) => {
  const instance = createAxiosInstance(base);

  try {
    const response = await instance.request({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    console.error(`[API Error] ${method} ${url}:`, error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const post = (
  base: keyof typeof BASE_URLS,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
) => apiCall(base, "POST", url, data, config);

export const get = (
  base: keyof typeof BASE_URLS,
  url: string,
  config?: AxiosRequestConfig,
) => apiCall(base, "GET", url, undefined, config);

export const put = (
  base: keyof typeof BASE_URLS,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
) => apiCall(base, "PUT", url, data, config);

export const del = (
  base: keyof typeof BASE_URLS,
  url: string,
  config?: AxiosRequestConfig,
) => apiCall(base, "DELETE", url, undefined, config);
