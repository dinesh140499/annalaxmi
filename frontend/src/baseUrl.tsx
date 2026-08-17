import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type Method,
} from "axios";

const BASE_URLS = {
  default: import.meta.env.VITE_API_URL,
};

const createAxiosInstance = (
  base: keyof typeof BASE_URLS = "default",
): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URLS[base],
    withCredentials: true,
  });

  // Attach token from localStorage if available (for robust cross-domain production support)
  instance.interceptors.request.use((config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Error reading token from storage:", e);
    }
    return config;
  });

  return instance;
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
    const msg = error.response?.data?.message || error.message || "Something went wrong";
    const customError = new Error(msg);
    (customError as any).response = error.response;
    (customError as any).status = error.response?.status;
    throw customError;
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

export const patch = (
  base: keyof typeof BASE_URLS,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
) => apiCall(base, "PATCH", url, data, config);

export const del = (
  base: keyof typeof BASE_URLS,
  url: string,
  config?: AxiosRequestConfig,
) => apiCall(base, "DELETE", url, undefined, config);
