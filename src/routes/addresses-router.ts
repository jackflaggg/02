import express, {Request, Response} from "express";
import {addresses} from "../repositories/addresses-repositoriy";

export const addressesRouter = express.Router();

addressesRouter.get('/', (req: Request, res:Response) => {
    if (req.query.value){
        let searchingString = req.query.value.toString()
        res.send(addresses.filter(p => p.value.indexOf(searchingString) > -1))
    } else {
        res.send(addresses)
    }
});

addressesRouter.get('/:id', (req: Request, res:Response) => {
    const foundAdrreses = addresses
        .find(a => a.id === +req.params.id);

    if (!foundAdrreses) {
        res.sendStatus(404);
        return;
    }

    res.json(foundAdrreses);
});