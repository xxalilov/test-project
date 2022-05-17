import Sequelize from "sequelize";

import { User } from "../models/User";
import { Message } from "../models/Message";
import { Room } from "../models/Room";

import { sequelize } from "../utils/database";

const db = async function () {
  User.hasMany(Message, {
    sourceKey: "user_id",
    foreignKey: "ownerId",
    as: "messages",
  });

  try {
    await sequelize.sync({ force: false });
  } catch (err) {
    console.error(err);
  }
};

export { db };
