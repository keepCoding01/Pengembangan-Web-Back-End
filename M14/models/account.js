import { sequelize, DataTypes } from "./model.js";

const Account = sequelize.define("account", {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  token: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM("Super Admin", "Admin", "User"),
    defaultValue: "User",
  },
});

Account.associate = (models) => {
  Account.hasMany(models.Note, { foreignKey: "account_id" });
};

export default Account;
