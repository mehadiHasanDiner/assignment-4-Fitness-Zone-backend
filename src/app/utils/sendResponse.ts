import { Response } from "express";
import { TStatusData } from "../interface/sendResponse.interface";

const sendResponse = <T>(res: Response, data: TStatusData<T>) => {
  return res.status(200).json({
    success: data?.success,
    message: data?.message,
    data: data?.data,
  });
};

export default sendResponse;
