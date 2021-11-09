import NewsAPI from 'ts-newsapi';
import config from 'config';
import { storeArticles } from '../services/article.service';
import log from '../utils/logger';

const apiKey = config.get<string>("newsApiKey");

export async function fetch() {
    try {
        const fetcher = new NewsAPI(apiKey)
        const articles = await fetcher.getEverything({ q: 'drone AND drones' });
        const response = await storeArticles(articles.articles);
        log.info(`found and stored ${response} new articles`);
        return response;
    } catch (e) {
        log.error(e);
    }
}

export default function fetchNews(interval: number) {
    const intervalInstance = setInterval(fetch, interval);
    return intervalInstance;
}