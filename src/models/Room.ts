import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

class Room extends Model {
  declare room_id: string;
  declare firstUser: string;
  declare secondUser: string;
}

Room.init(
  {
    room_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "rooms",
    sequelize,
  }
);

export { Room };
