import { sequelize, DataTypes } from "./model.js"; // Impor sequelize dan DataTypes dari model.js

const Note = sequelize.define("note", {
  title: DataTypes.STRING,
  note: DataTypes.STRING,
  category_id: DataTypes.INTEGER,
  account_id: DataTypes.INTEGER,
});

Note.associate = (models) => {
  Note.belongsTo(models.Category, { foreignKey: "category_id" });
  Note.belongsTo(models.Account, { foreignKey: "account_id" });
};

export default Note;
