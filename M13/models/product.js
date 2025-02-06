import { sequelize, DataTypes } from "./model.js";

// Jika nama tabel di database Anda adalah product (bukan products),
// Sequelize secara bawaan tidak akan mengenali tabel tersebut karena
// Sequelize menggunakan bentuk jamak (products) secara default untuk mencocokkan tabel di database.

const Product = sequelize.define("product", {
  name: DataTypes.STRING,
  price: DataTypes.INTEGER,
});

export default Product;
