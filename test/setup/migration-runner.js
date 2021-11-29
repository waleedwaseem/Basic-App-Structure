const Umzug = require("umzug");
const path = require("path");
const Sequelize = require("sequelize");
const { sequelize } = require(path.join(process.cwd(), "models/"));

const umzug = new Umzug({
  migrations: {
    path: path.join(process.cwd(), "database", "migrations/"),
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  storage: "sequelize",
  storageOptions: {
    sequelize,
  },
});

function migrate() {
  return umzug.up();
}

function revert() {
  return umzug.down({ to: 0 });
}

module.exports = {
  migrate,
  revert,
};
