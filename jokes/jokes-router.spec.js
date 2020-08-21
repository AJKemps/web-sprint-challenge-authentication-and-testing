const request = require("supertest");

const server = require("../api/server");
const db = require("../database/configuration.js");

describe("jokes router", () => {
  let token = "";

  it("should return 200", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Ryan",
        password: "pass",
      })
      .then((res) => {
        // console.log(res.body);
        token = res.body.token;
        // expect(res.body.token).toBeTruthy();
        // console.log(token);

        return request(server)
          .get("/api/jokes/")
          .set({ Authorization: token })
          .then((response) => {
            expect(response.status).toBe(200);
          });
      });
  });

  it("should return jokes", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Ryan",
        password: "pass",
      })
      .then((res) => {
        // console.log(res.body);
        token = res.body.token;
        // expect(res.body.token).toBeTruthy();
        // console.log(token);

        return request(server)
          .get("/api/jokes/")
          .set({ Authorization: token })
          .then((response) => {
            console.log(response.body);
            expect(response.body).toBeTruthy();
          });
      });
  });
});
