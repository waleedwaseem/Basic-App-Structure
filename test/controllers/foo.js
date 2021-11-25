const chai = require("chai");
const expect = require("chai").expect;
const { Foo } = require("../../models");

describe("foo Controller", function () {
  describe("create Foo", function () {
    it("should create a Foo in db", async function () {
      let myName = "Muhammad Uzair";
      let response = await chai
        .request("http://localhost:4000")
        .post("/api/foos/signup")
        .send({ firstName: myName });
      expect(response).to.have.status(200);
      expect(await Foo.findOne({ where: { firstName: myName } }))
        .to.have.property("firstName")
        .equal(myName);
    });

    it("shouldn't create a Foo in db", async function () {
      const response = await chai
        .request("http://localhost:4000")
        .post("/api/foos/signup")
        .send({});
      expect(response).to.have.status(400);
    });
  });
});
