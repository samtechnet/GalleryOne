import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser, { json } from "body-parser";
//import cors from "cors";
import { client, dbConnection } from "./services/database/database"
import { user_routes, cognito_routes } from "./routes/user";
import { cloudinary_routes } from "./routes/product";
// import now from "./utilities/func";
import AppError from "./services/errorHandlers/errors";
import errorController from "./middleware/errorController";
import { use, used } from "./services/errorHandlers/catchAsync";
import swaggerDoc from "swagger-ui-express";
import swaggerDocumentation from "./controller/documentation";

dotenv.config();


const PORT = process.env.PORT || process.env.PORT2;


const app: express.Application = express();
app.use(bodyParser.json());
app.use(express.json());
app.use("/documentations", swaggerDoc.serve);
app.use("/documentations", swaggerDoc.setup(swaggerDocumentation));


user_routes(app);
cognito_routes(app);
cloudinary_routes(app);
app.get("/galleryone", async function (req: Request, res: Response) {
  
    res.send("This is server");
   
    
  });

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    throw new AppError(`Requested URL ${req.path} not found!`, 404);
    
});
app.use(errorController);



 



const runApp = async (): Promise<any>=> {
    try {
         
        const result = await dbConnection('SELECT SESSION_USER');
        if (result.rows) {
            const res = console.log(result.rows)
        }
        app.listen(PORT, () => {
            console.log(`Server started successfulyy on PORT ${PORT}`);
           
        });
        
    } catch (error) {
        console.log(error)
      
    }
};

runApp();