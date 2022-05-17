import { Request, Response, NextFunction } from "express";
import { Room } from "../models/Room";
import { asyncHandler } from "../middleware/async";

/**
 * @desc  GET User Rooms
 * @route GET /api/room
 * @access  Private
 */
const getRooms = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;

    const r1: any = await Room.findAll({
      where: { firstUser: user.user_id },
    });

    const r2: any = await Room.findAll({
      where: { secondUser: user.user_id },
    });

    const rooms: any = [];

    r2.map((r: object) => {
      rooms.push(r);
    });

    r1.map((r: object) => {
      rooms.push(r);
    });
    res.status(200).json({
      success: true,
      data: rooms,
    });
  }
);

export { getRooms };
