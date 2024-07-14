import mongoose from "mongoose";
import { TErrorSource } from "../interface/errorSource.interface";

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSource = Object.values(err?.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });
  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
