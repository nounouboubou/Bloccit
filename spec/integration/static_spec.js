const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

  describe("GET /", () => {

    it("should return status code 200", (done) => {

      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

        done();
      });
    });
  });

  describe("GET /marco", () => {

    it("should return status code 200 & 'polo'", (done) => {

        request.get(base + "marco", (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(res.body).toBe("polo");

            done();

        });
    });
});

describe("GET /about", () => {
  it("should return status code 200 & 'About Us.'", () => {
      request.get(base + "about", (err, res, body) => {
          expect(body).toContain("About Us.");
      });
  });
});

});
