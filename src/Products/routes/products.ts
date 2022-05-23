// import dependecies and files 
import express, { Application, Request, Response } from "express";
import controllers from '../controllers/products';

// instantiate express router
const router = express.Router();

router.get('/allproducts', controllers.index);
router.get('/products/:id', controllers.show);
router.post('/products', controllers.create);
router.patch('/products', controllers.update);
router.delete('/products', controllers.deleteProduct);

export default router;