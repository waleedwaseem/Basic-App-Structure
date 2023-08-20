const Umzug = require('umzug');
const path = require('path');
const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');
const { sequelize } = require(path.join(process.cwd(), 'models/'));

const umzug = new Umzug({
  migrations: {
    path: path.join(process.cwd(), 'database', 'migrations/'),
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize,
  },
});

async function _createDatabase() {
  // create db if it doesn't already exist
  const { host, port, username, password, name } = global.config.get('db');
  const connection = await mysql.createConnection({
    host,
    port,
    user: username,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${name}\`;`);

  // connect to db
  const establishedSequelize = new Sequelize(name, username, password, {
    dialect: 'mysql',
  });

  // sync all models with database
  await establishedSequelize.sync();
  console.log('use database:', global.config.get('db').name);
  await connection.query('USE ' + global.config.get('db').name);
}

async function setup() {
  console.log('create database:', global.config.get('db').name);
  await _createDatabase();
  console.time('MIGRATIONS RUNNING TIME');
  console.log('run all migrations');
  await umzug.up();
  console.timeEnd('MIGRATIONS RUNNING TIME');
}
function migrate() {
  return setup();
}

function revert() {
  return umzug.down({ to: 0 });
}

module.exports = {
  migrate,
  revert,
};
