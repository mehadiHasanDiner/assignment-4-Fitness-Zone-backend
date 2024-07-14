import { TErrorSource } from "../interface/errorSource.interface";

export const handleDuplicateError = (err: any) => {
  const match = err.message.match(/dup key: { id: "(.*?)" }/);
  const getMessage = match && match[1];

  const errorSources: TErrorSource = [
    {
      path: "",
      message: `${getMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};
