import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import client from "./models/database"

dotenv.config();


const PORT = process.env.PORT;


const app: express.Application = express();
app.use(bodyParser.json());

app.get("/galleryone", async function (req: Request, res: Response) {
  
    res.send("This is server");
   
    
  });

const runApp = async ()=> {
    try {
        const conn = await client.connect();
        const sql = "SELECT SESSION_USER";
        const res = await conn.query(sql);
        conn.release();
        
        app.listen(PORT, () => {
            console.log(`Server started successfulyy on PORT ${PORT}`);
        });
        return console.log(res.rows)
    } catch (error) {
        console.log(error)
        runApp();
    }
};

runApp();