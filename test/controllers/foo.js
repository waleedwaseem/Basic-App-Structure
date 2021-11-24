const chai = require("chai");
const expect = require("chai").expect;

describe("foo Controller", function () {
  describe("create Foo", function () {
    it("should create a Foo in db", function (done) {
      chai
        .request("http://localhost:4000")
        .post("/api/foos/signup")
        .send({ firstName: "me" })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it("shouldn't create a Foo in db", function (done) {
      chai
        .request("http://localhost:4000")
        .post("/api/foos/signup")
        .send({})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
