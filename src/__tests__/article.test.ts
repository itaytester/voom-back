import { connect, disconnect } from "../db/connection";
import { ArticleRequest } from "../models/article.model";
import { storeArticles } from "../services/article.service";
import { fetch } from "../utils/newsApiFetcher";
import { createServer } from "../utils/server";
const app = createServer();

const mockedArticle: ArticleRequest[] = [{
  source: { id: "2222", name: "Itay Cohen News" },
  author: "Itay Cohen",
  title: "Bla Bla",
  description: "Bla Bla Bla",
  url: "Bla Bla Bla",
  urlToImage: "Bla",
  publishedAt: "2016-05-18T16:00:00Z",
  content: "Some"
}]


describe("Article tests:", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  // it("Fetching articles from News API should return a number", async () => {
  //   const response = await fetch();
  //   expect(response).toBeInstanceOf(Number);
  // });

  it("Adding new article should return 1", async () => {
    const response = await storeArticles(mockedArticle);
    expect(response).toBe(1);
  });
});
