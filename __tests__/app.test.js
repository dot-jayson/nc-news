const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("/api/topics", () => {
  test("GET: 200, responds with an array containing all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic) => {
          expect(typeof topic.description).toBe("string");
          expect(typeof topic.slug).toBe("string");
        });
      });
  });
});

describe("/api", () => {
  test("GET: 200, responds with a list of available API endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).not.toBe(0);
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET: 200, responds with corresponding article object when given an article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article[0].article_id).toBe(1);
        expect(article[0].title).toBe("Living in the shadow of a great man");
        expect(article[0].topic).toBe("mitch");
        expect(article[0].author).toBe("butter_bridge");
        expect(article[0].body).toBe("I find this existence challenging");
        expect(article[0].created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(article[0].votes).toBe(100);
        expect(article[0].article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("GET: 400, responds with appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/potato")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("GET: 404, responds with appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article does not exist");
      });
  });
});

describe("/api/articles", () => {
  test("GET: 200, responds with an array of article objects, with the correct properties sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].created_at).toBe("2020-11-03T09:12:00.000Z");
        expect(body.articles[0].author).toBe("icellusedkars");
        expect(body.articles[0].title).toBe(
          "Eight pug gifs that remind me of mitch"
        );
        expect(body.articles[0].article_id).toBe(3);
        expect(body.articles[0].topic).toBe("mitch");
        expect(body.articles[0].votes).toBe(0);
        expect(body.articles[0].article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
        expect(Number(body.articles[0].comment_count)).toBe(2);
        expect(!body.articles[0].body).toBe(true);
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});
