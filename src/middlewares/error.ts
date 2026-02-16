import { Request, Response, NextFunction } from "express";
import { ApiError } from "../dto/shared/api-response";
import { ENV } from "../env";

export const globalErrorHandler = (
  /* The error caught (thrown by a service or via next(error)) */
  err: unknown,
  req: Request,
  res: Response,
  /* Four-parameter signature, here we don't use next, but it's the convention that makes Express treat it as error middleware */
  next: NextFunction
) => {
  console.error("-----------------------------------");
  console.error(`[${new Date().toISOString()}] Unhandled error: `);
  console.error(err);
  console.error("-----------------------------------");

  /* headersSent means that the server has already started sending a response to the client, if this is the case, nothing is done, no double response */
  if (res.headersSent) {
    return;
  }

  if (err instanceof Error) {
    const isProduction = ENV.NODE_ENV === "production";
    return res.status(500).json({
      success: false,
      error: {
        code: isProduction ? "INTERNAL_SERVER_ERROR" : err.name,
        message: isProduction ? "An internal error has occurred" : err.message,
      },
    } satisfies ApiError);
  }

  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal error has occurred",
    },
  } satisfies ApiError);
};
