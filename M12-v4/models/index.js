// models/index.js
import { sequelize } from "./model.js";
import Category from "./category.js";
import Note from "./note.js";

// Atur asosiasi
Category.hasMany(Note, { foreignKey: "category_id" });
Note.belongsTo(Category, { foreignKey: "category_id" });

const db = { sequelize, Category, Note };
export default db;
