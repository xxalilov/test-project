import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ success: false, errors: err.serializeErrors() });
  }

  console.log(err);

  res.status(400).json({
    success: false,
    errors: [{ message: "Something went wrong" }],
  });
};
