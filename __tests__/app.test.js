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
        expect(article.article_id).toBe(1);
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.topic).toBe("mitch");
        expect(article.author).toBe("butter_bridge");
        expect(article.body).toBe("I find this existence challenging");
        expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(article.votes).toBe(100);
        expect(article.article_img_url).toBe(
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
  test("PATCH: 200, updates an article votes by article id, responding with the updated article", () => {
    const votes = {
      inc_votes: 5,
    };
    return request(app)
      .patch("/api/articles/1")
      .send(votes)
      .expect(200)
      .then(({ body }) => {
        const { updatedArticle } = body;
        expect(updatedArticle.article_id).toBe(1);
        expect(updatedArticle.title).toBe(
          "Living in the shadow of a great man"
        );
        expect(updatedArticle.topic).toBe("mitch");
        expect(updatedArticle.author).toBe("butter_bridge");
        expect(updatedArticle.body).toBe("I find this existence challenging");
        expect(updatedArticle.created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(updatedArticle.votes).toBe(105);
        expect(updatedArticle.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("PATCH 400: responds with appropriate status and error message when given an invalid id", () => {
    const votes = {
      inc_votes: 5,
    };
    return request(app)
      .patch("/api/articles/potato")
      .send(votes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("PATCH 400: responds with appropriate status and error message when given an invalid id", () => {
    const votes = {
      inc_votes: 5,
    };
    return request(app)
      .patch("/api/articles/5000")
      .send(votes)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article does not exist");
      });
  });
});

describe.only("/api/articles", () => {
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
  test("GET: 200, responds with all articles sorted by the author, with default order", () => {
    return request(app)
      .get("/api/articles?sort_by=author")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("author", { descending: true });
      });
  });
  test("GET: 200, responds with all articles sorted by the author, with ascending order", () => {
    return request(app)
      .get("/api/articles?sort_by=author&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("author", { descending: false });
      });
  });
  test("GET: 200, responds with all articles sorted by the title, with default order", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("title", { descending: true });
      });
  });
  test("GET:400, responds with appropriate status and error message if given an invalid sort_by query", () => {
    return request(app)
      .get("/api/articles?sort_by=invalid_query")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("GET:400, responds with appropriate status and error message if given an invalid order query", () => {
    return request(app)
      .get("/api/articles?order=invalid_query")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("GET: 200, responds with an array of comments for the given article id, sorted by most recent comments first", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments.length).toBe(2);
        body.comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
        });
      });
  });
  test("GET: 400, responds with appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/potato/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("GET: 404, responds with appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article does not exist");
      });
  });
  test("GET: 200, responds with an empty array when passed a article_id that is present in the database but has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.comments)).toBe(true);
        expect(body.comments.length).toBe(0);
      });
  });
  test("POST: 201, responds with the posted comment, accepting an object with username and body properties", () => {
    const newComment = {
      username: "butter_bridge",
      body: "testing testing 123",
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment.author).toBe("butter_bridge");
        expect(body.comment.body).toBe("testing testing 123");
      });
  });
  test("POST: 400, responds with appropriate status and error message when trying to post on a invalid article id", () => {
    const newComment = {
      username: "butter_bridge",
      body: "testing testing 123",
    };
    return request(app)
      .post("/api/articles/potato/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("POST: 404, responds with appropriate status and error message when trying to post on a valid but non-existent id", () => {
    const newComment = {
      username: "butter_bridge",
      body: "testing testing 123",
    };
    return request(app)
      .post("/api/articles/666/comments")
      .send(newComment)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article does not exist");
      });
  });
});
describe("/api/comments/:comment_id", () => {
  test("DELETE: 204, deletes given comment by comment_id and responds with no body", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("DELETE: 400, responds with an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .delete("/api/comments/invalid-id")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("DELETE: 404, responds with an appropriate status and error message when given a non-existent id", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comment does not exist");
      });
  });
});
describe("/api/users", () => {
  test("GET: 200, responds with an array of all users, with username, name and avatar_url properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
        body.users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});
