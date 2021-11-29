const chai = require("chai");
const expect = require("chai").expect;
const { Foo } = require("../../models");
const config = require("../../config");
const port = config.get("port");
const host = "127.0.0.1";
const hostUrl = `${host}:${port}`;

describe("foo Controller", function () {
  describe("create Foo", function () {
    it("should create a Foo in db", async function () {
      let myName = "Muhammad Uzair";
      let response = await chai
        .request(hostUrl)
        .post("/api/foos/signup")
        .send({ firstName: myName });
      expect(response).to.have.status(200);
      expect(await Foo.findOne({ where: { firstName: myName } }))
        .to.have.property("firstName")
        .equal(myName);
    });

    it("shouldn't create a Foo in db", async function () {
      const response = await chai
        .request(hostUrl)
        .post("/api/foos/signup")
        .send({});
      expect(response).to.have.status(400);
    });
  });

  describe("remove a Foo", function () {
    let user_id;

    before(async function () {
      const createdUser = await Foo.create({ firstName: "Temp User" });
      user_id = createdUser.id;
    });

    it("should remove user from db", async function () {
      const response = await chai
        .request(hostUrl)
        .delete("/api/foos/" + user_id);
      expect(response).to.have.status(200);
      expect(await Foo.findByPk(user_id)).to.be.null;
    });
  });

  describe("update a Foo", function () {
    const NameBefore = "Name Before";
    const NameAfter = "Name After";
    let user_id;
    before(async function () {
      const createdUser = await Foo.create({ firstName: NameBefore });
      user_id = createdUser.id;
    });

    it("should update single Foo's firstName", async function () {
      const response = await chai
        .request(hostUrl)
        .patch("/api/foos/" + user_id)
        .send({ firstName: NameAfter });
      expect(response).to.have.status(200);
      expect(await Foo.findByPk(user_id))
        .to.have.property("firstName")
        .equal(NameAfter);
    });
  });
});
