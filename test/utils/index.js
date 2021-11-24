const chai = require("chai");
const expect = require("chai").expect;
const path = require("path");
const pathToUtilsIndex = path.join(process.cwd(), "utils", "index.js");
const isEmailValid = require(pathToUtilsIndex).isEmailValid;

describe("test connstants", function () {
  it("isEmailValid should return true", function () {
    expect(isEmailValid("email@email.com")).to.be.true;
  });

  it("isEmailValid should return false", function () {
    expect(isEmailValid("abc.def@mail")).to.be.false;
  });
});

describe("create Foo route", function () {
  it("should create a Foo in db", function (done) {
    chai
      .request("http://localhost:4000")
      .post("/api/foos/signup")
      .send({ firstName: "uzair" })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});
