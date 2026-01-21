import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import type { Request, Response, NextFunction } from "express";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const headers = fromNodeHeaders(req.headers);
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    headers.set("better-auth.session-token", token);
    headers.append("Cookie", `better-auth.session-token=${token}`);
  }

  /* Request Better Auth to verify the cookie */
  const session = await auth.api.getSession({
    headers: headers,
  });

  if (!session) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  res.locals.session = session;

  next();
};
