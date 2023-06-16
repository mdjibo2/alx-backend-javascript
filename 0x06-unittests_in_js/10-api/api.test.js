const request = require("request");
const { describe, it } = require("mocha");
const expect = require("chai").expect;

describe("Index page", function() {
    const options = {
        url: "http://localhost:7865/",
        method: "GET"
    };
    it("check correct status code", function (done) {
        request(options, function (err, res, body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it("check correct content", function (done) {
        request(options, function (err, res, body) {
            expect(body).to.equal("Welcome to the payment system");
            done();
        });
    });
});

describe("Cart page", function() {
    it("check correct status code for correct url", function (done) {
        request.get("http://localhost:7865/cart/12", function (err, res, body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it("check correct content for correct url", function (done) {
        request.get("http://localhost:7865/cart/12", function (err, res, body) {
            expect(body).to.equal("Payment methods for cart 12");
            done();
        });
    });
    it("check correct status code for incorrect url", function (done) {
        request.get("http://localhost:7865/cart/kim", function (err, res, body) {
            expect(res.statusCode).to.equal(404);
            done();
        });
    });
});

describe("Available_payments page", function() {
    it("check correct status for correct url", function (done) {
        request.get("http://localhost:7865/available_payments", function (err, res, body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it("check correct body content for correct url", function (done) {
        const options = {
            url: "http://localhost:7865/available_payments",
            json: true
        };
        request.get(options, function (err, res, body) {
            const expectedBody = {
                payment_methods: {
                    credit_cards: true,
                    paypal: false
                }
            };
            expect(body).to.deep.equal(expectedBody);
            done();
        });
    });
});

describe("Login", function() {
    it("check correct status code for request that's sent properly", function (done) {
        const options = {
            url: "http://localhost:7865/login",
            json: true,
            body: {
                userName: "JOE"
            }
        };
        request.post(options, function (err, res, body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it("check correct content for request that's sent properly", function (done) {
        const options = {
            url: "http://localhost:7865/login",
            json: true,
            body: {
                userName: "JOE"
            }
        };
        request.post(options, function (err, res, body) {
            expect(body).to.contain("Welcome JOE");
            done();
        });
    });
    it("check correct status code for request that's not sent properly", function (done) {
        const options = {
            url: "http://localhost:7865/login",
            json: true,
            body: {
                usame: "JOE"
            }
        };
        request.post(options, function (err, res, body) {
            expect(res.statusCode).to.equal(404);
            done();
        });
    });
});
