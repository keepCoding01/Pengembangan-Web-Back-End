import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("notes_app", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export { sequelize, DataTypes, Sequelize };
