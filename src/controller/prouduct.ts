import express, { application, NextFunction, Request, Response } from 'express';
import { Product, AllProducts } from '../models/product';
import AppError from '../services/errorHandlers/errors';
import { use, used } from "../services/errorHandlers/catchAsync";
import { upload ,cloud} from "../services/cloudinary/cloudinary"


// create an instance of the class imported
const products = new AllProducts();

// method to show all Products in the db
const index = use(async (req: Request, res: Response) => {
    const allProduct = await products.index()
    if (!allProduct) {
        throw new AppError('Product records not found', 400)
    }
    return res.status(200).json({
        success: true,
        message: allProduct
    })
})
const show = use(async (req: Request, res: Response) => {
    const id= req.params.id as string
    const aProduct = await products.show(id)
    if (!aProduct) {
        throw new AppError('Product record not found', 400)
    }
    return res.status(200).json({
        success: true,
        message: aProduct
    })
})

const create = use(async (req: Request, res: Response) => {
    const linkPath = String(req.file?.path)
    const product_link =await cloud(linkPath, "Gallaryonefolder")
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        avater: product_link
    };
    //console.log(product)
    const allProduct = await products.create(product)
    if (!allProduct) {
        throw new AppError('Product record not found', 400)
    }
    return res.status(200).json({
        success: true,
        message: allProduct
    })
})

const update = use(async (req: Request, res: Response) => {
    const id= req.params.id as string
    const aProduct = await products.show(id)
    if (!aProduct) {
        throw new AppError('Product record not found', 400)
    }
    return res.status(200).json({
        success: true,
        message: aProduct
    })
})

export {index,create,show}