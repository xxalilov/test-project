import { Model, DataTypes, ForeignKey } from "sequelize";
import { sequelize } from "../utils/database";
import { User } from "./User";

class Message extends Model {
  declare message_id: string;
  declare room_id: string;
  declare title: string;
  declare filename: string;
  declare filepath: string;
  declare number: number;
  declare ownerId: ForeignKey<User["user_id"]>;
}

Message.init(
  {
    message_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    room_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    filename: {
      type: DataTypes.STRING,
    },
    filepath: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "messages",
    sequelize,
  }
);

export { Message };
