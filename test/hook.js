const { migrate } = require("./migration-runner");

exports.mochaHooks = {
  beforeAll: function (done) {
    // do something before all test once
    console.log("running migrations");
    migrate();
    done();
  },
  afterAll: function (done) {
    // do something after all test once

    // truncate tables

    done();
  },
};
