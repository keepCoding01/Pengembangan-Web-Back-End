import { sequelize, DataTypes } from "./model.js"; // Impor sequelize dan DataTypes dari model.js

const Note = sequelize.define("note", {
  title: DataTypes.STRING,
  note: DataTypes.STRING,
  category_id: DataTypes.INTEGER, // Foreign Key
});

Note.associate = (models) => {
  Note.belongsTo(models.Category, { foreignKey: "category_id" });
};

export default Note; 