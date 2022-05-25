import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from 'morgan';
import { apiErrorHandler } from "./Error/api-errorhandler";
import apiRoutes from './Routes/apis';

dotenv.config();

const PORT = process.env.PORT;

const app: express.Application = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get("/", async function (req: Request, res: Response) {
    res.send("Api available at /galleryone ");
});

app.use('/galleryone', apiRoutes);

app.use(apiErrorHandler);

const runApp = async ()=> {
    try {
        app.listen(PORT, () => {
            console.log(`Server started successfulyy on PORT ${PORT}`);
        })    
    } catch (error) {
        console.log(error)
        runApp();
    }
};

runApp()