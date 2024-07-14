import { TErrorSource } from "../interface/errorSource.interface";

export const handleError = () => {
  const statusCode = 400;
  const message = "";
  const errorSources: TErrorSource = [
    {
      path: "throw Error || throw AppError",
      message: "Error occurred!",
    },
  ];
  return {
    statusCode,
    message,
    errorSources,
  };
};
