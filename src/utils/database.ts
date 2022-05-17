import { Sequelize } from "sequelize";

const sequelize = new Sequelize("onconnect", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
});

export { sequelize };
