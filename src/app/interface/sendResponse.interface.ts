export type TStatusData<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};
