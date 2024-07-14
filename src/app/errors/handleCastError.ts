import mongoose from "mongoose";

export const handleCastError = (err: mongoose.Error.CastError) => {
  const statusCode = 400;
  const errorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  return {
    statusCode,
    message: "Invalid Id passed",
    errorSources,
  };
};
