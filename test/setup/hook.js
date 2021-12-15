process.env.NODE_ENV = 'test';
global.config = require('../../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { migrate, revert } = require('./migration-runner');
chai.use(chaiHttp);

exports.mochaHooks = {
  beforeAll: async function () {
    // do something before all test once
    console.log('running migrations...');
    await migrate();
  },
  afterAll: async function () {
    // do something after all test once
    console.log('reverting migrations...');
    await revert();
  },
};
