import express from "express";

import { getRooms } from "../controllers/room";

import { userAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", userAuth, getRooms);

export { router as RoomRoute };
