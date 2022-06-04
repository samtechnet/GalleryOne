import express, { Request, Response, NextFunction } from "express";
import { User, UserTable } from "../models/user";
import {use,used} from "../services/errorHandlers/catchAsync";
import AppError from "../services/errorHandlers/errors";
import Jwt from "jsonwebtoken";
import verifyAuthToken from "./Auth/verifyAuthToken";
//import signUp  from "./Auth/cognito-service";

const userstable = new UserTable();
const secret = String(process.env.TOKEN_SECRET);

const index = use(async (req: Request, res: Response, next: NextFunction) => {
    const users = await userstable.index();
    if (!users) {
        throw new AppError('Failed to fetch users', 400)
    }
    return res.json({
        success: true,
        data: users,
      });
    
});

const create =use( async (req: Request, res: Response,next: NextFunction) => {
    const user: User = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                date_of_birth: req.body.date_of_birth,
                home_address: req.body.home_address,
                password_digest: req.body.password_digest,
                NIN_number: req.body.nin_number
            };

      const newUser = await userstable.create(user);
    const token = Jwt.sign({ user: newUser }, secret);
    if (!newUser) {
        throw new AppError('Failed to insert record!', 400)
    }
    return res.status(200).json({
        seccess: true,
        data: token,
        message: "User created successfully"
    });
  });
  
// const create = async (req: Request, res: Response) => {
//     const user: User = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         phone_number: req.body.phone_number,
//         date_of_birth: req.body.date_of_birth,
//         home_address: req.body.home_address,
//         password: req.body.password,
//     };
//     try {
//       const newUser = await userstable.create(user);
//       const token = Jwt.sign({ user: newUser }, secret);
//       return res.json(token);
//     } catch (error) {
//       res.status(400);
//       res.json(error);
//     }
// };
  
const show = use( async (req: Request, res: Response,next: NextFunction) => {
    const id = req.params.id as string;
    const user = await userstable.show(id);
    if (!user) {
        throw new AppError('Record not found', 404)
    }
    return res.status(200).json({
        success: true,
        data: user,
        messsage: 'Success',
      });
   
    
});
  
const authenticate =use( async (req: Request, res: Response,) => {
    
      const authenticatedUser = await userstable.authenticate(
        req.body.email,
        req.body.password
      );
      const token = Jwt.sign(
        { user: authenticatedUser },
        secret
    );
    if (!authenticatedUser) {
        throw new AppError('Unable to login User', 404);
    }
    return res.status(200).json({
        data: token,
        message: "Login success",
        success: true,
      });
    
  });
export { index, create, show, authenticate };