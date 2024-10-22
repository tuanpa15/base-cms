import {
  IParamsLogin,
  IProfile,
  IResponseLogin,
} from "../utils/interface/auth";
import { sendGet, sendPost } from "./axios";

export const loginApi = (params: IParamsLogin): Promise<IResponseLogin> =>
  sendPost("/cms/auth/login", params);

export const getProfileApi = (): Promise<{ data: IProfile }> =>
  sendGet("/cms/profile");
