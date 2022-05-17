import express from "express";
import { body } from "express-validator";

const router = express.Router();

import {
  signin,
  signout,
  currentuser,
  allUsers,
  signup,
  fail,
} from "../controllers/auth";
import { userAuth } from "../middleware/auth";

import { validateRequest } from "../middleware/validate-request";

router.post(
  "/signup",
  [
    body("name")
      .isLength({ min: 3, max: 30 })
      .withMessage("Name must be min 3"),
    body("login")
      .isLength({ min: 3 })
      .withMessage("Login must be min 3 characters"),
    body("password")
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage("Password must be between 5 and 20 characters"),
  ],
  validateRequest,
  signup
);

router.get("/users", userAuth, allUsers);

router.post("/signin", signin);

router.post("/signout", userAuth, signout);

router.get("/currentuser", userAuth, currentuser);

router.get("/signin/fail", fail);

export { router as AuthRoute };
