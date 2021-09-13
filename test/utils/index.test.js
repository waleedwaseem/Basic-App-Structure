const { expect } = require("chai");
const { isEmailValid } = require("../../utils");

describe("Validation", function () {
  it("should validate email", function () {
    const result = isEmailValid("abc@example.com");
    expect(result).to.be.eq(true);
  });
});
