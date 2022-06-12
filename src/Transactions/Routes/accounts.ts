// import dependecies and files 
import express, { Application, Request, Response } from "express";
import controllers from '../Controllers/accounts';

// instantiate express router
const router = express.Router();

router.get('/allaccounts', controllers.index);
router.get('/search/:user_id', controllers.show);
router.get('/balance/:user_id', controllers.showBalance);
router.post('/newaccount', controllers.create);
router.patch('/creditaccount', controllers.creditAccount);
router.patch('/debitaccount', controllers.debitAccount);
router.delete('/:user_id', controllers.deleteAccount);

export default router;