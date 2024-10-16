export type StartApiTimeType = number | null;

export type ApiResponseType<T> = {
  success: boolean,
  message: string,
  payload: T
};
