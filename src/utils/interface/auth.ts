export interface IToken {
  token: string;
  refreshToken: string;
}

export interface IParamsLogin {
  email: string;
  password: string;
}

export interface IResponseLogin {
  data: IToken;
}

export interface IUserPermission {
  status: number;
  permission: IPermission;
}

export interface IPermission {
  id: number;
  name: string;
}

export interface IRole {
  id: number;
  roleName: string;
  isSystem: number;
  isVisible: number;
}

export interface IProfile {
  id: number;
  fullName: string;
  email: string;
  userPermission: IUserPermission[];
  role: IRole;
}
