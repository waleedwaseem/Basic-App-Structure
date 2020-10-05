"use strict";
module.exports = (sequelize, DataTypes) => {
  const Foo = sequelize.define(
    "Foo",
    {
      firstName: DataTypes.STRING,
    },
    {}
  );
  Foo.associate = function (models) {
    console.log("associations for", models);
  };
  return Foo;
};
