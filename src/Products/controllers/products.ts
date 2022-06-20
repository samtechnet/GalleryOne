// import necessary dependecies
import express, { application, NextFunction, Request, Response } from 'express';
import { Product, AllProducts } from '../models/products';
import jwt from "jsonwebtoken";
import { AppError } from '../../Error/ApiError';
import { catchErrors } from '../../Error/catchAsync';


// create an instance of the class imported
const products = new AllProducts();

// method to show all Products in the db
const index = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.path);
        const myProducts = await products.index();
        if (!myProducts.length) {
            throw new AppError('Record not found', 404);
        }
        return res.json({ 
            success: 1,
            data: myProducts 
        });  
});

// method to show a product by id
const show = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id as string;
        const myProduct = await products.show(id);
        if (!myProduct) {
            throw new AppError('Record not found', 404);
        }
        return res.json({ 
            success: 1,
            data: myProduct
           
        });
});

// method to create a new product in the db
const create = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description
    };
        const newProduct = await products.create(product);
        if (product) {
            throw new AppError('Product details are incomplete', 400);
        }
        return res.json({ 
            message: 'Successfully created',
            data: newProduct
        });
});

// method to update a product in the db
const update = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id as string;
        const { name, price, category, description } = req.body;
        const myProducts = await products.update(id, name, price, category, description);
        // if(!myProducts) {
        //     throw new AppError('Product details are incomplete', 400);

        // }
        return res.json({
            message: 'Succesfully updated',
            data: myProducts
        });
});

// method to delete a product by id in the db
const deleteProduct = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id as string;
        const myProducts = await products.delete(id);
        if(!id) {
            throw new AppError('Product not found: Invalid ID', 404);
        }
        return res.status(200).send('Successfully Deleted');
});


export default {
    index,
    show,
    create,
    update,
    deleteProduct
}