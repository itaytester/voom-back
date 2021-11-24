import { Application } from "express";
import { getArticleByIdHandler, getArticlesByQueryHandler } from "./controllers/article.controller";
import { getUserRegisterHandler } from "./controllers/user.controller";
import requireAuthorization from "./middleware/requireAuthorization";
import { userJwtPayload } from "./models/user.model";

export const routes = (app:Application) => {
    app.get('/', async (req, res)=> {
        res.send("hello from dronenews api");
    });

    app.get('/api/article/:articleId', getArticleByIdHandler);
    app.get('/api/article', getArticlesByQueryHandler);

    app.post('/api/user/register', getUserRegisterHandler);

    app.get('/api/stam', requireAuthorization, (req,res) =>{    
        res.send(`AUTHORIZED, hello ${(res.locals.user as userJwtPayload).firstName}`);
    });
}