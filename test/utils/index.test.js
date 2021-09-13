const axios = require("axios");
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { isEmailValid } = require("../../utils");
const { getUserCompany } = require("../../utils/user");

chai.use(sinonChai);

describe("Validation", function () {
  it("should validate email", function () {
    const result = isEmailValid("abc@example.com");
    expect(result).to.be.eq(true);
  });
});

describe("User data", function () {
  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });
  it("should return user company", function (done) {
    const getStub = sandbox
      .stub(axios, "get")
      .resolves({ data: { company: "Productbox" } });
    getUserCompany("mhassanrahi")
      .then(function (result) {
        expect(result.data.company).to.be.a.string;
        expect(result.data.company).to.be.eq("Productbox");
        expect(getStub).to.have.been.calledOnce;
        expect(getStub).to.have.been.calledWith(
          "https://api.github.com/users/mhassanrahi"
        );
        done();
      })
      .catch(done);
  });
});
