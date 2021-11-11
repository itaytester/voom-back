import cors from "cors";
import express, { Application } from "express";
import { routes } from '../routes';


export function createServer() {
    const app:Application = express();
    app.use(cors());
    app.use(express.json());
    routes(app);
    return app;
}