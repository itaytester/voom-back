import ArticleModel, {
  ArticleDocument,
  ArticleRequest,
} from "../models/article.model";
import { FilterQuery, QueryOptions } from "mongoose";


export async function storeArticles(articles: ArticleRequest[]): Promise<ArticleDocument[]> {
  try {
    const promises = articles.map(async (article: ArticleRequest) => {
      return new Promise<ArticleDocument>(async (resolve, reject) => {
        try {
          const result = await ArticleModel.findOne(article);
          if (!result) {
            const newArticle = await ArticleModel.create(article);
            resolve(newArticle)
          }
        } catch (e: any) {
          reject(e);
        }
      });
    });
    const result = await Promise.all(promises);
    return result.filter(article => article);
  } catch (e: any) {
    throw e;
  }
}

export async function findArticle(
  query: FilterQuery<ArticleDocument>,
  options: QueryOptions = { lean: true }
) {
  try{
    const result = await ArticleModel.findOne(query, {}, options);
    return result;
  } catch(e: any){
    throw e;
  }
}

export async function findManyArticles(
  query: FilterQuery<ArticleDocument>,
  options: QueryOptions = { lean: true }
) {
  try{
    const result = await ArticleModel.find(query, {}, options);
    return result;
  } catch(e: any){
    throw e;
  }
}

export async function deleteArticles(
  query: FilterQuery<ArticleDocument>
) {
  try{
    const result = await ArticleModel.deleteMany(query);
    return result;
  } catch(e: any){
    throw e;
  }
}
