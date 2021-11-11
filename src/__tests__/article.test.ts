import supertest from "supertest";
import { connect, disconnect } from "../db/connection";
import { ArticleRequest } from "../models/article.model";
import { storeArticles, deleteArticles } from "../services/article.service";
import { createServer } from "../utils/server";

const app = createServer();

const articlePayload: ArticleRequest[] = [
  {
    source: { id: "2222", name: "Itay Cohen News" },
    author: "Itay Cohen",
    title: "Bla Bla",
    description: "Bla Bla Bla",
    url: "Bla Bla",
    urlToImage: "Bla",
    publishedAt: "2016-05-18T16:00:00Z",
    content: "Some",
  },
];

describe("Article tests:", () => {

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  describe("adding new article:", () => {
    describe("given that article doesn't exist in db", () =>{
      it("should return 1 (articles found)", async () => {
        const articles = await storeArticles(articlePayload);
        expect(articles.length).toBe(1);
      });
    });
  });

  describe("query article:", () => {
    describe("given the keywords Bla Bla", () => {
      it("should return one article", async () => {
        const { body: articles } = await supertest(app)
          .get("/api/article?words=Bla Bla")
          .expect(200);

        expect(articles.length).toBe(1);
      });
    });

    describe("given the minimum date of 2016-05-18T16:00:00Z", () => {
      it("should return one article", async () => {
        const { body: articles } = await supertest(app)
          .get("/api/article?from=2016-05-18T16:00:00Z")
          .expect(200);
        expect(articles.length).toBe(1);
      });
    });

    describe("given the maximum date of 2016-05-18T16:00:00Z and keywords Bla Bla", () => {
      it("should return one article", async () => {
        const { body: articles } = await supertest(app)
          .get("/api/article?words=Bla Bla&to=2016-05-18T16:00:00Z")
          .expect(200);
        expect(articles.length).toBe(1);
      });
    });
  });

  describe("get article by Id:", () => {
    describe("given the article exist", () => {
      it("should return one article", async () => {
        await deleteArticles({});

        const articles = await storeArticles(articlePayload);
        const { body: article } = await supertest(app)
          .get(`/api/article/${articles[0]._id}`)
          .expect(200);
        expect(article._id.toString()).toBe(articles[0]._id.toString());
      });
    });
  });
});
