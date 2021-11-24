import cors from "cors";
import express, { Application } from "express";
import authorization from "../middleware/authorizeSession";
import { routes } from '../routes';


export function createServer() {
    const app:Application = express();
    app.use(cors());
    app.use(express.json());
    app.use(authorization);
    routes(app);
    return app;
}