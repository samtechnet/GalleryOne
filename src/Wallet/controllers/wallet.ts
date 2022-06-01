// import necessary dependecies
import express, { application, NextFunction, Request, Response } from 'express';
import { Wallet, TheWallet } from '../models/wallet';
import jwt from "jsonwebtoken";
import { AppError } from '../../Error/ApiError';
import { catchErrors } from '../../Error/catchAsync';

// create an instance of the class imported
const wallet = new TheWallet();

// method to show a users ballance by id
const show = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.params.id as string;
    const myWallet = await wallet.show(user_id);
    if (!myWallet) {
        throw new AppError('Invalid Id', 404);
    }
    return res.json({
        success: 1,
        data: myWallet
    });
});

// method to create a new wallet in the db
const create = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const clientsWallet: Wallet = {
        balance: req.body.name,
        user_id: req.body.user_id
    };
    const newWallet = await wallet.create(clientsWallet);
    if (!clientsWallet) {
        throw new AppError('Incomplete Details', 400);
    }
    return res.json ({
        message: 'Successfully Created',
        data: newWallet
    })

})

export default {
    show,
    create
}