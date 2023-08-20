process.env.NODE_ENV = 'test';
global.config = require('../../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { migrate, revert } = require('./migration-runner');
const { server } = require('../setup/testHelper');
chai.use(chaiHttp);

exports.mochaHooks = {
  beforeAll: async function () {
    // do something before all test once
    console.log('running migrations...');
    await migrate();
  },
  afterAll: async function () {
    // do something after all test once
    console.log('closing server');
    server.close();

    console.log('reverting migrations...');
    await revert();
  },
};
