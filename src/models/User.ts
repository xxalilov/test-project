import { Model, DataTypes, HasManyCreateAssociationMixin } from "sequelize";
import { sequelize } from "../utils/database";
import { Message } from "./Message";
import { Room } from "./Room";

class User extends Model {
  declare user_id: string;
  declare name: string;
  declare login: string;
  declare password: string;
  declare createMessage: HasManyCreateAssociationMixin<Message, "ownerId">;
}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    sequelize,
  }
);

export { User };
