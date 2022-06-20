// import dependecies and files 
import express, { Application, Request, Response } from "express";
import controllers from '../controllers/wallet';

// instantiate express router
const router = express.Router();

router.get('/userwallet/:id', controllers.show);
router.post('/newwallet', controllers.create);

export default router;