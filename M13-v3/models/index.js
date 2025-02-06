import { sequelize } from "./model.js";
import Category from "./category.js";
import Note from "./note.js";
import Account from "./account.js";

Category.hasMany(Note, { foreignKey: "category_id" });
Note.belongsTo(Category, { foreignKey: "category_id" });

Account.hasMany(Note, { foreignKey: "account_id" });
Note.belongsTo(Account, { foreignKey: "account_id" });

const db = { sequelize, Category, Note, Account };
export default db;
