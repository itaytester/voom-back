import ArticleModel, {
  ArticleDocument,
  ArticleRequest,
} from "../models/article.model";
import { FilterQuery, QueryOptions } from "mongoose";
import log from "../utils/logger";


export async function storeArticles(articles: ArticleRequest[]): Promise<number> {
  try {
    const promises = articles.map(async (article: ArticleRequest) => {
      return new Promise<boolean>(async (resolve, reject) => {
        try {
          const result = await ArticleModel.exists(article);
          if (!result) await ArticleModel.create(article);
          resolve(!result)
        } catch (e: any) {
          reject(e);
        }
      });
    });
    const result = await Promise.all(promises);
    return result.filter(Boolean).length;
  } catch (e: any) {
    throw e;
  }
}

export async function findArticles(
  query: FilterQuery<ArticleDocument>,
  options: QueryOptions = { lean: true }
) {
  const result = await ArticleModel.find(query, {}, options);

  return result;
}
