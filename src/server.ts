import express, {   Request, Response,NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser, { json } from "body-parser";
import cors from "cors";
import { client, dbConnection } from "./services/database/database"
import { user_routes, cognito_routes } from "./routes/user";
import { cloudinary_routes } from "./routes/product";
// import now from "./utilities/func";
import AppError from "./services/errorHandlers/errors";
import {errorController} from "./middleware/errorController";
import { use, used } from "./services/errorHandlers/catchAsync";
import swaggerDoc from "swagger-ui-express";
import swaggerDocumentation from "./controller/documentation";
import { Result } from "express-validator";

dotenv.config();


const PORT = process.env.PORT  || 5000;

const app: express.Application = express();
app.use(bodyParser.json());
// app.use(cors({
//     'origin': "*",
//     'methods': ["GET", "PUT", "POST", "DELETE","PATCH"],
//     'allowedHeaders': ['Content-Type', 'Authorization'],
//     'optionsSuccessStatus': 204,
//     'preflightContinue': false
// }
// ));
app.use(cors());
app.use(express.json());
app.use("/documentations", swaggerDoc.serve);
app.use("/documentations", swaggerDoc.setup(swaggerDocumentation));


user_routes(app);
cognito_routes(app);
cloudinary_routes(app);
app.get("/galleryone", async function (req: Request, res: Response) {
    res.send("This is server"); 
});
 

app.get("/db", async (req: Request, res: Response) => {
    client.connect();
    try {
        const heroku = await client.query("SELECT SESSION_USER");
        const result = { "result": (heroku) ? heroku.rows : null };
        res.send(JSON.stringify(result));
        client.end()
    } catch (error) {
    }
});
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    throw new AppError(`Requested URL ${req.path} not found!`, 404);
    
});
app.use(errorController);



 
// app.listen(PORT, () => {
//     console.log(`Server started successfulyy on PORT ${PORT}`);
   
// });

export default app;
const runApp = async (): Promise<any>=> {
    try {
         
        const result = await dbConnection('SELECT SESSION_USER');
        if (result.rows) {
            const res = console.log(result.rows)
        }
        app.listen(PORT, () => {
            console.log(`Cors-enabled web server listening on PORT ${PORT}`);
           
        });
        
    } catch (error) {
        console.log(error)
      
    }
};

runApp();