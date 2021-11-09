import { Application } from "express";
import NewsAPI from 'ts-newsapi';
import config from 'config';
import { ArticleDocument, ArticleRequest } from "./models/article.model";

export const routes = (app:Application) => {
    app.get('/', async (req, res)=> {
        res.send("hello from dronenews api");
    });

    app.get('/api/news', async (req, res) => {
        const apiKey = config.get<string>("newsApiKey");
        const fetcher = new NewsAPI(apiKey)
        const response = await fetcher.getEverything({q: 'drone AND drones'});
        const a = response.articles;
        res.send(response);
    });
}