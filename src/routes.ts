import { Application } from "express";
import { getArticleByIdHandler, getArticlesByQueryHandler } from "./controllers/article.controller";

export const routes = (app:Application) => {
    app.get('/', async (req, res)=> {
        res.send("hello from dronenews api");
    });

    app.get('/api/article/:articleId', getArticleByIdHandler);
    app.get('/api/article', getArticlesByQueryHandler);
}