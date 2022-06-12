// import necessary dependecies
import express, { application, NextFunction, Request, Response } from 'express';
import { Accounts, AllAccounts } from '../Models/accounts';
import jwt from "jsonwebtoken";
import { AppError } from '../../Error/ApiError';
import { catchErrors } from '../../Error/catchAsync';

// create an instance of the class imported
const accounts =  new AllAccounts();

// method to show all accounts in the db
const index = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const theAccounts = await accounts.index();
    if (!theAccounts.length) {
        throw new AppError('Record not found', 404);
    }
    return res.json({ 
        success: 1,
        data: theAccounts
    });  
});

// method to show an account by id
const show = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.params.user_id as string;
    const myAccount = await accounts.show(user_id);
    if (!myAccount) {
        throw new AppError('Record not found', 404);
    }
    return res.json({ 
        success: 1,
        data: myAccount
    });
});

// method to show an account by id
const showBalance = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.params.user_id as string;
    const myAccount = await accounts.showBalance(user_id);
    if (!myAccount) {
        throw new AppError('Record not found', 404);
    }
    return res.json({ 
        success: 1,
        data: myAccount
    });
});

// method to create a new account in the db
const create = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const amount = 0;
    const account: Accounts = {
       user_id: req.body.user_id,
       accounts_number: req.body.accounts_number,
       amount: amount,
       balance: req.body.balance
    };
        const newAccount = await accounts.create(account);
        if (!newAccount) {
            throw new AppError('Product details are incomplete', 400);
        }
        return res.json({ 
            message: 'Successfully created',
            data: newAccount
        });
});

// method to update an account in the db
const debitAccount = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const account: Accounts = {
        user_id: req.body.user_id,
        accounts_number: req.body.accounts_number,
        amount: req.body.amount-req.body.amount,
        balance: req.body.balance-req.body.amount
     };
    const myAccounts = await accounts.debitAccount(account);
    if(!myAccounts) {
        throw new AppError('Account details are incomplete', 400);
    }
    return res.json({
        message: 'Succesfully updated',
        data: myAccounts
    });
});

// method to update an account in the db
const creditAccount = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const account: Accounts = {
        user_id: req.body.user_id,
        accounts_number: req.body.accounts_number,
        amount: req.body.amount-req.body.amount,
        balance: req.body.balance+req.body.amount
     };
    const myAccounts = await accounts.creditAccount(account);
    if(!myAccounts) {
        throw new AppError('Account details are incomplete', 400);
    }
    return res.json({
        message: 'Succesfully updated',
        data: myAccounts
    });
});

// method to delete a account by id in the db
const deleteAccount = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.params.id as string;
    const myProducts = await accounts.delete(user_id);
    if(!user_id) {
        throw new AppError('Product not found: Invalid ID', 404);
    }
    return res.status(200).send('Successfully Deleted');
});

export default {
    index,
    show,
    showBalance,
    create,
    creditAccount,
    debitAccount,
    deleteAccount
}
