import { sequelize, DataTypes } from "./model.js";

const Account = sequelize.define("account", {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  token: DataTypes.STRING,
});

Account.associate = (models) => {
  Account.hasMany(models.Note, { foreignKey: "account_id" });
};

export default Account;
