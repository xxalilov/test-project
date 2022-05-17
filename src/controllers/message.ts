import { Request, Response, NextFunction } from "express";
import { Message } from "../models/Message";
import { Room } from "../models/Room";
import { asyncHandler } from "../middleware/async";
import { BadRequestError } from "../errors/bad-request-error";

/**
 * @desc  Send Message
 * @route POST /api/message/send/:receiverId
 * @access  Private
 */
const sendMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;

    // Check receiver ID
    if (!req.params.receiverId) {
      throw new BadRequestError("Please input receiverId!");
    }

    const r1 = await Room.findOne({
      where: { firstUser: user.user_id, secondUser: req.params.receiverId },
    });

    const r2 = await Room.findOne({
      where: { firstUser: req.params.receiverId, secondUser: user.user_id },
    });

    let room = r1 ? r1 : r2;

    if (!room) {
      room = await Room.create({
        firstUser: user.user_id,
        secondUser: req.params.receiverId,
      });
    }

    const msgLth = await Message.findAll({ where: { room_id: room.room_id } });

    if (!req.file && !req.body.title) {
      throw new BadRequestError("You must input file or message!");
    }

    const message = await user.createMessage({
      title: req.body.title,
      room_id: room.room_id,
      filename: req.file ? req.file.originalname : null,
      filepath: req.file ? req.file.path : null,
      number: msgLth.length + 1,
    });

    res.status(201).json({
      success: true,
      data: {
        message,
      },
    });
  }
);

/**
 * @desc  GET Room Messages
 * @route GET /api/message/get/:roomId
 * @access  Private
 */
const getRoomMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;

    const room = await Room.findOne({ where: { room_id: req.params.roomId } });

    if (room?.firstUser !== user.user_id && room?.secondUser !== user.user_id) {
      throw new BadRequestError("This room is not yours!");
    }

    const messages = await Message.findAll({
      where: { room_id: req.params.roomId },
    });

    res.status(200).json({
      success: true,
      data: messages,
    });
  }
);

// Exports
export { sendMessage, getRoomMessage };
