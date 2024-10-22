export interface IResponsePaging<T> {
  data: T;
  pageIndex: number;
  totalItems: number;
  totalPages: number;
}

export interface IDefaultParams {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
}
