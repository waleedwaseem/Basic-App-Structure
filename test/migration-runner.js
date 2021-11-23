const Umzug = require("umzug");
const path = require("path");
const Sequelize = require("sequelize");
const { sequelize } = require("../models/index.js");

// config Umzug for running migrations
const umzug = new Umzug({
  migrations: {
    // path to migrations files folder
    path: path.join(process.cwd(), "database", "migrations/"),
    // inject sequelize's QueryInterface in the migrations
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  // indicates that the migration data should be store in the database
  // itself through sequelize. The default configuration creates a table
  // named `SequelizeMeta`.
  storage: "sequelize",
  storageOptions: {
    sequelize,
  },
});

async function migrate() {
  return await umzug.up();
}

async function revert() {
  return await umzug.down({ to: 0 });
}

module.exports = {
  migrate,
  revert,
};
