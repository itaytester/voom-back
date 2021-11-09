import express, { Application } from "express";
import { routes } from '../routes';


export function createServer() {
    const app:Application = express();
    routes(app);
    return app;
}