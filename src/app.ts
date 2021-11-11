import dotenv from 'dotenv';
import config from 'config';
dotenv.config();
import { Application } from 'express';
import fetchNews from './utils/newsApiFetcher';
import log from './utils/logger';
import { connect } from './db/connection';
import { createServer } from './utils/server';


const PORT = process.env.PORT
export const app:Application = createServer();

app.listen(PORT || 8080, async () => {
    log.info(`running on port ${PORT}`);
    await connect();
    fetchNews(10000);
});