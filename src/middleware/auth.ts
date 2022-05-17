import { Request, Response, NextFunction } from "express";

const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      success: false,
      errors: [
        {
          message: "You must login!",
        },
      ],
    });
  }
  next();
};

export { userAuth };
