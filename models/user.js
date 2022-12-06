const { isEmailValid } = require("../utils/");
("use strict");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      archive: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );
  User.associate = function (models) {
    console.log("🚀 ~ file: user.js:37 ~ models", models);
  };
  User.beforeCreate(async (user, options) => {
    if (!isEmailValid(user.email)) throw new Error();
    if (!user.archive) user.archive = false;
  });
  return User;
};
