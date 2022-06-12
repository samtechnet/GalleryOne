// import dependencies and files
import express, { Application, Request, Response } from "express";
import productsRoutes from '../Products/routes/products';
import usersRoutes from '../Users/routes/users';
import accountsRoutes from "../Transactions/Routes/accounts";


const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Api is live');
})

router.use('/products', productsRoutes);
router.use('/users', usersRoutes);
router.use('/accounts', accountsRoutes);

export default router;