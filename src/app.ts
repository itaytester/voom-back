import { Application } from 'express';
import { fetchNews } from './utils/newsApiFetcher';
import log from './utils/logger';
import config from 'config';
import connect from './db/connection';
import { createServer } from './utils/server';

const PORT = config.get<string>("port");
export const app:Application = createServer();

app.listen(PORT || 8080, async () => {
    log.info(`running on port ${PORT}`);
    await connect();
    fetchNews(10000);
});