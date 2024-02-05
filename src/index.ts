// @ts-ignore
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-router";
import express, {NextFunction, Request, Response} from "express";

export const app = express();

const port = process.env.PORT || 5700;

app.use('/products', productsRouter);
app.use('/addresses', addressesRouter);

let blablaMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.blabla = 'hello';
    next();
};

let authGardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === '123'){
        next();
    } else {
        res.send(401)
    }
}

let requestCOunter = 0;

let requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    requestCOunter++;
    next()
};

app.use(blablaMiddleWare);
app.use(requestCounterMiddleware);
app.use(authGardMiddleware);

app.get('/productss', (req: Request, res: Response) => {
    // @ts-ignore
    const blabla = req.blabla;
    res.send({value: blabla + "!"})
})

app.get('/users', (req: Request, res: Response) => {
    // @ts-ignore
    const blabla = req.blabla;
    res.send({value: blabla + " from users! " + requestCOunter})
})

app.listen(port, ()=> {
    console.log(`Example app listening port: ${port}`)
});