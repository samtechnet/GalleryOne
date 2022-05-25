// import dependencies and files
import express, { Application, Request, Response } from "express";
import productsRoutes from '../Products/routes/products';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Api is live');
})

router.use('/products', productsRoutes);

export default router;