const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisements = require("../../src/db/models").Advertisements;


describe("routes : advertisements", () => {

  beforeEach((done) => {
    this.Advertisements;
    sequelize.sync({force: true}).then((res) => {

      Advertisements.create({
        title: "JS Frameworks",
        description: "There is a lot of them"
      })
      .then((Advertisements) => {
        this.Advertisements = Advertisements;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });


  describe("GET /advertisements", () => {

    it("should return a status code 200 and all advertisements", (done) => {

      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Advertisements");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

  describe("GET /advertisements/new", () => {

    it("should render a new Advertisements form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisements");
        done();
      });
    });

  });
  describe("POST /advertisements/create", () => {
  const options = {
    url: `${base}create`,
    form: {
      title: "Loreal Makeup",
      description: "Number 1 worldwide"
    }
  };

  it("should create a new advertisement and redirect", (done) => {

//#1
    request.post(options,

//#2
      (err, res, body) => {
        advertisements.findOne({where: {title: "Loreal Makeup"}})
        .then((advertisements) => {
          expect(res.statusCode).toBe(303);
          expect(advertisements.title).toBe("Loreal Makeup");
          expect(advertisements.description).toBe("Number 1 worldwide");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      }
    );
  });
});
describe("GET /advertisements/:id", () => {

  it("should render a view with the selected advertisements", (done) => {
    request.get(`${base}${this.advertisements.id}`, (err, res, body) => {
      expect(err).toBeNull();
      expect(body).toContain("JS Frameworks");
      done();
    });
  });

});
describe("POST /advertisements/:id/destroy", () => {

  it("should delete the advertisements with the associated ID", (done) => {

//#1
    Advertisements.all()
    .then((advertisements) => {

//#2
      const advertisementsCountBeforeDelete = advertisements.length;

      expect(advertisementsCountBeforeDelete).toBe(1);

//#3
      request.post(`${base}${this.advertisements.id}/destroy`, (err, res, body) => {
        Advertisements.all()
        .then((advertisements) => {
          expect(err).toBeNull();
          expect(advertisements.length).toBe(advertisementsCountBeforeDelete - 1);
          done();
        })

      });
    });

  });

});
describe("GET /advertisements/:id/edit", () => {

  it("should render a view with an edit advertisements form", (done) => {
    request.get(`${base}${this.advertisements.id}/edit`, (err, res, body) => {
      expect(err).toBeNull();
      expect(body).toContain("Edit advertisements");
      expect(body).toContain("JS Frameworks");
      done();
    });
  });

});
describe("POST /advertisements/:id/update", () => {

  it("should update the advertisements with the given values", (done) => {
     const options = {
        url: `${base}${this.advertisements.id}/update`,
        form: {
          title: "JavaScript Frameworks",
          description: "There are a lot of them"
        }
      };
//#1
      request.post(options,
        (err, res, body) => {

        expect(err).toBeNull();
//#2
        Topic.findOne({
          where: { id: this.advertisements.id }
        })
        .then((advertisements) => {
          expect(advertisements.title).toBe("JavaScript Frameworks");
          done();
        });
      });
  });

});
});