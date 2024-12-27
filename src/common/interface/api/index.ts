export interface IAPIResponse {
  status: string;
  message: string;
}

export default interface IApiWithDataResponse<T> extends IAPIResponse {
  data: T;
}
