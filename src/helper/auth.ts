import { IToken } from "../utils/interface/auth";
import Cookies from "js-cookie";

export const saveToken = (params: IToken) => {
  Cookies.set("token", params.token);
  Cookies.set("refreshToken", params.refreshToken);
};
export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  window.location.replace("/login");
};
