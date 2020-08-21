const request = require("supertest");

const server = require("../api/server");
const db = require("../database/configuration.js");

describe("register", () => {
  beforeEach(async () => {
    // empty table and reset primary key back to 1
    await db("users").truncate();
  });

  describe("register a user", () => {
    it("should register user", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "Ryan",
          password: "pass",
        })
        .then((res) => {
          expect(res.body.data.username).toEqual("Ryan");
        });
    });
    it("should return a hashed password", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "Ryan",
          password: "pass",
        })
        .then((res) => {
          console.log(res.body);
          expect(res.body.data.password.length).toEqual(60);
        });
    });
  });
});

describe("log in", () => {
  it("should return message", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Ryan",
        password: "pass",
      })
      .then((res) => {
        console.log(res.body);
        expect(res.body.message).toBeTruthy();
      });
  });
  it("should return token", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Ryan",
        password: "pass",
      })
      .then((res) => {
        console.log(res.body);
        expect(res.body.token).toBeTruthy();
      });
  });
});
