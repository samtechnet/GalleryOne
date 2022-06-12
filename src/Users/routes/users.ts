// import dependecies and files 
import express, { Application, Request, Response } from "express";
import userControllers, { verifyAuthToken } from '../controllers/users';

// instantiate express router
const router = express.Router();

router.get('/users', verifyAuthToken, userControllers.index);
router.get('/searchusers/:id', verifyAuthToken, userControllers.show);
router.post('/signup', userControllers.create);
router.post('/login', userControllers.authenticate);
router.patch('/updateusers/:id', verifyAuthToken, userControllers.update);
router.delete('/delete/:id', verifyAuthToken, userControllers.deleteUser);

export default router;