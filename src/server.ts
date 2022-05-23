import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();


const PORT = process.env.PORT;


const app: express.Application = express();
app.use(bodyParser.json());

app.get("/galleryone", async function (req: Request, res: Response) {
  
    res.send("This is server");
   
    
});

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