import { sequelize, DataTypes } from "./model.js"; // Impor sequelize dan DataTypes dari model.js

const Category = sequelize.define("category", {
  category_name: DataTypes.STRING,
  icon: DataTypes.STRING,
  color: DataTypes.STRING,
});

Category.associate = (models) => {
  Category.hasMany(models.Note, { foreignKey: "category_id" });
};

export default Category; 