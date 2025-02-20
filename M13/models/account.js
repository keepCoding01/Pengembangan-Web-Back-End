import { sequelize, DataTypes } from "./model.js";

const Account = sequelize.define("account", {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  active: DataTypes.TINYINT,
});

export default Account;
