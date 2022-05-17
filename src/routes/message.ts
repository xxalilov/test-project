import express from "express";

import { getRoomMessage, sendMessage } from "../controllers/message";

import { userAuth } from "../middleware/auth";

const router = express.Router();

router.post("/send/:receiverId", userAuth, sendMessage);

router.get("/get/:roomId", userAuth, getRoomMessage);

export { router as MessageRoute };
