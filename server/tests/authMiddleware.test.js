const test = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

test("Auth Middleware - missing authorization header returns 401", () => {
    let statusCode = null;
    let jsonResponse = null;

    const req = { headers: {} };
    const res = {
        status: (code) => {
            statusCode = code;
            return {
                json: (data) => { jsonResponse = data; }
            };
        }
    };
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    authMiddleware(req, res, next);

    assert.equal(statusCode, 401);
    assert.equal(jsonResponse.message, "Unauthorized");
    assert.equal(nextCalled, false);
});

test("Auth Middleware - missing Bearer prefix returns 401", () => {
    let statusCode = null;
    let jsonResponse = null;

    const req = { headers: { authorization: "Basic token123" } };
    const res = {
        status: (code) => {
            statusCode = code;
            return {
                json: (data) => { jsonResponse = data; }
            };
        }
    };
    let nextCalled = false;

    authMiddleware(req, res, nextCalled);

    assert.equal(statusCode, 401);
    assert.equal(jsonResponse.message, "Unauthorized");
});

test("Auth Middleware - invalid token returns 401 Invalid Token", () => {
    process.env.JWT_SECRET = "testsecret123";

    let statusCode = null;
    let jsonResponse = null;

    const req = { headers: { authorization: "Bearer invalid.jwt.token" } };
    const res = {
        status: (code) => {
            statusCode = code;
            return {
                json: (data) => { jsonResponse = data; }
            };
        }
    };

    authMiddleware(req, res, () => {});

    assert.equal(statusCode, 401);
    assert.equal(jsonResponse.message, "Invalid Token");
});

test("Auth Middleware - valid token populates req.user and calls next()", () => {
    const secret = "testsecret123";
    process.env.JWT_SECRET = secret;

    const payload = { userId: "user_abc_123", email: "hero@projectme.com" };
    const token = jwt.sign(payload, secret);

    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    authMiddleware(req, res, next);

    assert.equal(nextCalled, true);
    assert.ok(req.user);
    assert.equal(req.user.userId, "user_abc_123");
    assert.equal(req.user.email, "hero@projectme.com");
});
