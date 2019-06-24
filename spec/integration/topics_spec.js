const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;

describe("routes : Topic", () => {
  beforeEach((done) => {
    this.Topic;
    sequelize.sync({force: true}).then((res) => {

     Topic.create({
       title: "JS Frameworks",
       description: "There is a lot of them"
     })
      .then((Topic) => {
        this.Topic = Topic;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });

  describe("GET /Topic", () => {

    it("should return a status code 200 and all topics", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Topic");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

  describe("GET /Topic/new", () => {

    it("should render a new topic form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Topic");
        done();
      });
    });
  });

  describe("POST /Topic/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "blink-182 songs",
        description: "What's your favorite blink-182 song?"
      }
    };

    it("should create a new topic and redirect", (done) => {

//#1
      request.post(options,

//#2
        (err, res, body) => {
          Topic.findOne({where: {title: "blink-182 songs"}})
          .then((Topic) => {
            expect(res.statusCode).toBe(303);
            expect(Topic.title).toBe("blink-182 songs");
            expect(Topic.description).toBe("What's your favorite blink-182 song?");
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

  describe("GET /Topic/:id", () => {

    it("should render a view with the selected topic", (done) => {
      request.get(`${base}${this.Topic.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("JS Frameworks");
        done();
      });
    });

  });

  describe("POST /Topic/:id/destroy", () => {

    it("should delete the topic with the associated ID", (done) => {

//#1
      Topic.all()
      .then((Topic) => {

//#2
        const topicCountBeforeDelete = Topic.length;

        expect(topicCountBeforeDelete).toBe(1);

//#3
        request.post(`${base}${this.Topic.id}/destroy`, (err, res, body) => {
          Topic.all()
          .then((Topic) => {
            expect(err).toBeNull();
            expect(Topic.length).toBe(topicCountBeforeDelete - 1);
            done();
          })

        });
      });

    });

  });

  describe("GET /Topic/:id/edit", () => {

    it("should render a view with an edit topic form", (done) => {
      request.get(`${base}${this.Topic.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Topic");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });

  });

  describe("POST /Topic/:id/update", () => {

    it("should update the topic with the given values", (done) => {
       const options = {
          url: `${base}${this.Topic.id}/update`,
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
            where: { id: this.Topic.id }
          })
          .then((Topic) => {
            expect(Topic.title).toBe("JavaScript Frameworks");
            done();
          });
        });
    });

  });

});