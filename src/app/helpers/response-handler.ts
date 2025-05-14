import { Response } from "express";

export const responseHandler = (
  res: Response,
  httpCode: number,
  message: string,
  data?: any
): Response => {
  return res.status(httpCode).json({
    status: httpCode,
    message,
    data,
  });
};
