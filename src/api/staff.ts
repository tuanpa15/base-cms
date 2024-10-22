import { IDefaultParams, IResponsePaging } from "utils/interface";
import { sendDelete, sendGet, sendPost, sendPut } from "./axios";
import {
  IParamsAddStaff,
  IParamsUpdateStaff,
  IStaff,
} from "utils/interface/staff";

export const getListStaffsApi = (
  params: IDefaultParams
): Promise<IResponsePaging<IStaff[]>> => sendGet(`/cms/staff`, params);

export const updateStatusStaffApi = ({ id, ...params }: IParamsUpdateStaff) =>
  sendPut(`/cms/staff/edit/${id}`, params);

export const addStaffApi = (params: IParamsAddStaff) =>
  sendPost("/cms/staff/add-new-staff", params);

export const deleteStaffApi = (id: number) =>
  sendDelete(`/cms/staff/remove/${id}`);
