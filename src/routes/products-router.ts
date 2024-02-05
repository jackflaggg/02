import express, {Request, Response, Router} from "express";
import {products, productsRepositoriy} from "../repositories/products-repositoriy";

export const productsRouter = express.Router();

productsRouter.get('/', (req: Request, res:Response) => {
    const foundProducts = productsRepositoriy.findProducts(req.query.title?.toString());
        res.send(foundProducts)
})

productsRouter.post('/', (req: Request, res:Response) => {
    /*const newProduct = {
        id: +(new Date()),
        title: req.body.title
    }
    products.push(newProduct)
    res
        .status(201)
        .send(newProduct)*/

    const newProduct = productsRepositoriy.createProduct(req.body.title);
    res
        .status(201)
        .send(newProduct);
})

productsRouter.get('/:id', (req: Request, res:Response) => {
    const product = productsRepositoriy.getProductById(+req.params.id)

    if (!product) {
        res.sendStatus(404);
        return;
    }
    res.json(product);
})

productsRouter.put('/:id', (req: Request, res:Response) => {
    const isUpdated = productsRepositoriy.updateProduct(+req.params.id, req.body.title)

    if (isUpdated) {
        const product = productsRepositoriy.getProductById(+req.params.id)
        res.send(product);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})

productsRouter.delete('/:id', (req: Request, res:Response) => {
    const deleteProduct = productsRepositoriy.deleteProduct(+req.params.id);
    if (deleteProduct){
        res.send(204)
    } else {
        res.send(404)
    }
})
