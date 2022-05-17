import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { BadRequestError } from "../errors/bad-request-error";
import { asyncHandler } from "../middleware/async";
import { User } from "../models/User";

import { Password } from "../utils/password";

/**
 * @desc  GET All Users
 * @route GET /api/auth/users
 * @access  Private
 */
const allUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll();

    res.status(200).json({
      success: true,
      data: users,
    });
  }
);

/**
 * @desc  SignUp User
 * @route POST /api/auth/signup
 * @access  Public
 */
const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const existingUser = await User.findOne({
      where: { login: req.body.login },
    });

    if (existingUser) {
      throw new BadRequestError("Login already use!");
    }

    if (req.body.password !== req.body.confirmpassword) {
      throw new BadRequestError("Passwords do not match!");
    }

    // Salt password
    const hashed = await Password.toHash(req.body.password);
    req.body.password = hashed;

    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  }
);

/**
 * @desc  SignIn User
 * @route POST /api/auth/signin
 * @access  Prublic
 */
const signin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await passport.authenticate("local", {
      successRedirect: "/api/auth/currentuser",
      failureRedirect: "/api/auth/signin/fail",
      session: true,
    })(req, res, next);
  }
);

/**
 * @desc  SignOut User
 * @route POST /api/auth/signout
 * @access  Private
 */
const signout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    req.logout();
    req.session = null;
    res.status(200).json({
      success: true,
      data: {},
    });
  }
);

/**
 * @desc  GET Current User
 * @route GET /api/auth/currentuser
 * @access  Private
 */
const currentuser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(req.user);
  }
);

/**
 * @desc  SignIn fail
 * @route GET /api/auth/signin/fail
 * @access  Public
 */
const fail = (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    errors: [
      {
        message: "Login or password is incorrect!",
      },
    ],
  });
};

// Exports
export { signup, signin, signout, currentuser, allUsers, fail };
