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
        expect(body.length).not.toBe(0);
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
  test("GET: 20, responds with corresponding article object when given an article_id", () => {
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
});
