import { CommonStatus } from "utils/enums";

export interface IStaff {
  id: number;
  fullName: string;
  email: string;
  status: number;
  createdDate: string;
}

export interface IParamsUpdateStaff {
  id: number;
  status: CommonStatus;
}

export interface IParamsAddStaff {
  email: string;
  fullName: string;
  password: string;
}
