import { sequelize, DataTypes } from "./model.js";

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    user_email: {
      type: DataTypes.STRING,
    },
    user_address: {
      type: DataTypes.STRING,
    },
    user_phone: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default User;

// import { sequelize, DataTypes } from "./model.js";

// const User = sequelize.define("user", {
//   user_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//   },
//   user_name: DataTypes.STRING,
//   user_email: DataTypes.STRING,
//   user_address: DataTypes.STRING,
//   user_phone: DataTypes.STRING,
// }, {
//   timestamps: false,
// });

// export default User;
