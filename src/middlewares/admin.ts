import type { Request, Response, NextFunction } from "express";

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = res.locals.session;

  if (!session) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  const user = session.user as any;

  if (user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ success: false, error: "Forbidden: Admins only" });
  }

  next();
};
