// import necessary dependecies
import express, { NextFunction, Request, Response } from 'express';
import { Product, AllProducts } from '../models/products';
import jwt from "jsonwebtoken";

// create an instance of the class imported
const products = new AllProducts();

// method to show all Products in the db
const index = async (req: Request, res: Response) => {
    try {
        const myProducts = await products.index();
        res.status(200).send({ 
            data: myProducts, 
            message: 'Products fetched' 
        });
    } catch (error) {
        res.status(400).send('Bad request');
    }    
}

// method to show a product by id
const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const myProduct = await products.show(id);
        res.status(200).send({ 
            data: myProduct, 
            message: 'Product was fetched' 
        });
    } catch (error) {
        res.status(400).send('Bad request');
    }
}

// method to create a new product in the db
const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description
    };

    try {
        const newProduct = await products.create(product);
        res.status(201).send({ 
            data: newProduct, 
            message: 'Successfully created' 
        });
    } catch (error) {
        res.status(401).send('Unauthorized User');
    }
}

// method to update a product in the db
const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { name, price, category, description } = req.body;
        const myProducts = await products.update(id, name, price, category, description);
        res.status(200).send('Succesfully updated');
    } catch (error) {
        res.status(401).send('Unauthorized user');
    }
    
}

// method to delete a product by id in the db
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const myProducts = await products.delete(id);
        res.status(200).send('Success');
    } catch (error) {
        res.status(401).send('Unauthorized user');
    }
   
}

export default {
    index,
    show,
    create,
    update,
    deleteProduct
}