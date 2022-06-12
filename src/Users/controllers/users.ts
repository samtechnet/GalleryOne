// import the necessary dependecies and functions
import express, { NextFunction, Request, Response } from 'express';
import { User, GalleryOneUsers } from '../models/users';
import jwt from "jsonwebtoken";
import { AppError } from '../../Error/ApiError';
import { catchErrors } from '../../Error/catchAsync';


// create an instance of class of users imported
const users = new GalleryOneUsers();

// method to show all Users in the db
const index = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const allUsers = await users.index();
    if (!allUsers.length) {
        throw new AppError('Record not found', 404);
    }
    return res.json({ 
        success: 1,
        data: allUsers 
    });  
});

// method to show a user by id
const show = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const singleUser = await users.show(id);
    if (!singleUser) {
        throw new AppError('Record not found', 404);
    }
    return res.json({ 
        success: 1,
        data: singleUser
    });
});

// method to create a new user in the db
const create = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password
    };
    const newUser = await users.create(user);
    if (!newUser) {
        throw new AppError('User details are incomplete', 400);
    }
    console.log(newUser);
    return res.json({ 
        message: 'Successfully created',
        data: newUser
    });
});

// method to authenticate the user logining in
const authenticate = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password
    };
    if (!user) {
        throw new AppError('incomplete details', 400);
    }
    const userAuthenticated = await users.authenticate(req.body.username, req.body.password);
    const token = jwt.sign({ user: userAuthenticated }, process.env.TOKEN_SECRET as string);
    console.log(token);
    return res.status(201).send('Successfully Login');
});

// method to verify that the user is suing an authorized token
export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        const decoded = jwt.verify(token as string, process.env.TOKEN_SECRET as string);
        if (!decoded) {
            throw new AppError('Unauthorized user', 401);
        }
        next();
    } catch (error) {
        throw new AppError('Something went wrong', 500);

    }
}

// method to update a user in the db
const update = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const { username, password } = req.body;
    const updatedUser = await users.update(id, username, password);
    if (!updatedUser) {
        throw new AppError('Incomplete details', 400);
    }
    console.log(updatedUser);
    return res.json({ 
        message: 'Successfully updated',
        data: updatedUser
    });
});

// method to delete a user by id in the db
const deleteUser = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    if(!id) {
        throw new AppError('Invalid ID', 404);
    }
    const oneUser = await users.delete(id);
    return res.send('Successfully deleted User').status(200);
});

export default {
    index,
    show,
    create,
    authenticate,
    update,
    deleteUser
}






