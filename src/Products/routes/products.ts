// import dependecies and files 
import express, { Application, Request, Response } from "express";
import controllers from '../controllers/products';

// instantiate express router
const router = express.Router();

router.get('/allproducts', controllers.index);
router.get('/:productId', controllers.show);
router.post('/newproduct', controllers.create);
router.patch('/:productId', controllers.update);
router.delete('/:productId', controllers.deleteProduct);

export default router;