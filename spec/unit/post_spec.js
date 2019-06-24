const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {

    beforeEach((done) => {
        
        this.Topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Expeditions to Alpha Centauri",
                description: "A compilation of reports from recent visits to the star system."
            })
            .then((Topic) => {
                this.Topic = Topic;

                Post.create({
                    title: "My first visit to Proxima Centauri b",
                    body: "I saw some rocks.",
                    TopicId: this.Topic.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#create()", () => {

        it("should create a post object with a title, body and assigned topic", (done) => {

            Post.create({
                title: "Pros of Cryosleep during the long journey",
                body: "1. Not having to answer the 'are we there yet?' question.",
                TopicId: this.Topic.id
            })
            .then((post) => {
                expect(post.title).toBe("Pros of Cryosleep during the long journey");
                expect(post.body).toBe("1. Not having to answer the 'are we there yet?' question.");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a post with missing title, body, or assigned topic", (done) => {

            Post.create({
                title: "Pros of Cryosleep during the long journey"
            })
            .then((post) => {
                
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Post.body cannot be null");
                expect(err.message).toContain("Post.topicId cannot be null");
                done();
            })
        });
    });

    describe("#setTopic()", () => {

        it("should associate a topic and a post together", (done) => {

            Topic.create({
                title: "Challenges of interstellar travel",
                description: "1. The Wi-Fi is terrible"
            })
            .then((newTopic) => {
                expect(this.post.TopicId).toBe(this.Topic.id);
                this.post.setTopic(newTopic)
                .then((post) => {
                    expect(post.TopicId).toBe(newTopic.id);
                    done();
                });
            })
        });
    });

    describe("#getTopic()", () => {

        it("should return the associated topic", (done) => {

            this.post.getTopic()
            .then((associatedTopic) => {
                expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
                done();
            });
        });
    });
})