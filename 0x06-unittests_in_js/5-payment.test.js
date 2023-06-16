const { describe, it, beforeEach, afterEach } = require("mocha");
const sinon = require("sinon");
const sendPaymentRequestToApi = require("./5-payment");
const expect = require("chai").expect;

describe("sendPaymentRequestToApi", function () {
  let consoleLogStub;

  beforeEach(function () {
    consoleLogStub = sinon.stub(console, "log");
  });

  afterEach(function () {
    consoleLogStub.restore();
  });

  it("check that console.log is called with the right arg (test 1)", function () {
    sendPaymentRequestToApi(100, 20);
    expect(consoleLogStub.withArgs("The total is: 120").calledOnce).to.be.true;
  });

  it("check that console.log is called with the right arg (test 2)", function () {
    sendPaymentRequestToApi(10, 10);
    expect(consoleLogStub.withArgs("The total is: 20").calledOnce).to.be.true;
  });
});
