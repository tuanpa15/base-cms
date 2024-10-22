import Axios from "axios";
import Cookies from "js-cookie";
import { throttle } from "lodash";
import configs from "../utils/configs";
import { logout } from "../helper/auth";

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
});

export async function getRefreshToken() {
  try {
    const res = await Axios({
      method: "POST",
      url: `${configs.API_DOMAIN}/operation/auth/refresh-token`,
      headers: {
        Authorization: `Bearer ${Cookies.get("refreshToken")}`,
      },
    });
    if (res.status === 200) {
      const data = res.data;
      const { token, expiresAt } = data?.data?.accessToken;
      const { token: refreshToken, expiresAt: refreshTokenExpiresAt } =
        data?.data?.refreshToken;
      Cookies.set("token", token, { expires: new Date(expiresAt * 1000) });
      Cookies.set("refreshToken", refreshToken, {
        expires: new Date(refreshTokenExpiresAt * 1000),
      });
    }
  } catch (error: any) {}
}

const throttled = throttle(getRefreshToken, 10000, { trailing: false });

axiosInstance.interceptors.request.use(
  async (config: any) => {
    if (!!Cookies.get("token")) {
      config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
    } else if (!!Cookies.get("refreshToken")) {
      await throttled();
      if (!!Cookies.get("token"))
        config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalConfig = error.config;
    if (error?.response?.status !== 401) {
      return Promise.reject(error);
    }
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      return logout();
    }

    return Axios({
      method: "POST",
      url: `${configs.API_DOMAIN}/operation/auth/refresh-token`,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          const { token, expiresAt } = data?.data?.accessToken;
          const { token: refreshToken, expiresAt: refreshTokenExpiresAt } =
            data?.data?.refreshToken;

          Cookies.set("token", token, { expires: new Date(expiresAt * 1000) });
          Cookies.set("refreshToken", refreshToken, {
            expires: new Date(refreshTokenExpiresAt * 1000),
          });

          originalConfig.headers["Authorization"] = `Bearer ${token}`;
          return Axios(originalConfig);
        } else {
          logout();
        }
      })
      .catch((err: any) => {
        console.log(err);
        if (err?.response?.status === 401) {
          return logout();
        }
        return Promise.reject(error);
      });
  }
);

export const sendGet = (url: string, params?: any) =>
  axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any) =>
  axiosInstance
    .post(url, params, { params: queryParams })
    .then((res) => res.data);
export const sendPut = (url: string, params?: any) =>
  axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: any) =>
  axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: any) =>
  axiosInstance.delete(url, { params }).then((res) => res.data);
