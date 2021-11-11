import mongoose from "mongoose";

export interface ArticleQuery {
  words?: string,
  from?: Date,
  to?: Date
}

export interface ArticleRequest {
    source: { id: string | null, name: string },
    author: string | null,
    title: string,
    description: string | null,
    url: string,
    urlToImage: string | null,
    publishedAt: string,
    content: string | null
}

export interface ArticleDocument extends mongoose.Document {
  createdAt: Date,
  updatedAt: Date
}

const articleSchema = new mongoose.Schema(
  {
    source: { id: String, name: String },
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
    content: String,
  },
  { timestamps: true }
);

const ArticleModel = mongoose.model<ArticleDocument>("Article", articleSchema);

export default ArticleModel;
