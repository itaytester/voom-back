import { Request, Response } from "express";
import { ArticleQuery } from "../models/article.model";
import { findManyArticles, findArticle } from "../services/article.service";
import { divideTextToWords } from "../utils/text.utils";

export async function getArticlesByQueryHandler(req: Request, res: Response) {
  const { words, from, to } = req.query;
  const shouldUseWords = words;
  const shouldUseDate = from || to;
  const wordRegex = shouldUseWords ? divideTextToWords(words as string) : "";
  const query = {
    ...(shouldUseWords && {
      $or: [
        { content: { $regex: new RegExp(wordRegex, "i") } },
        { title: { $regex: new RegExp(wordRegex, "i") } },
      ],
    }),
    ...(shouldUseDate && {
      publishedAt: {
        ...(from && { $gte: from }),
        ...(to && { $lte: to }),
      },
    }),
  };

  const articles = await findManyArticles(query);

  res.send(articles);
}

export async function getArticleByIdHandler(req: Request, res: Response) {
  const articleId = req.params.articleId;

  const article = await findArticle({ _id: articleId });
  if (!article) res.status(404);

  res.send(article);
}
