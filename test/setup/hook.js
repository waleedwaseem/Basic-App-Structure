const chai = require("chai");
const chaiHttp = require("chai-http");

const { migrate, revert } = require("./migration-runner");
const app = require("../../app");

chai.use(chaiHttp);

exports.mochaHooks = {
  beforeAll: async function () {
    // do something before all test once
    console.log("running migrations...");
    await migrate();
  },
  afterAll: async function () {
    // do something before all test once
    console.log("closing server");
    requester.close();

    console.log("reverting migrations...");
    await revert();
  },
};

console.log("starting server");
const requester = chai.request(app).keepOpen();

exports.serverRequester = requester;
