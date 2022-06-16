import express from "express";
import { upload, store, } from "../services/cloudinary/cloudinary";
import { index, create, show } from "../controller/prouduct";
import verifyAuthToken from "../controller/Auth/verifyAuthToken";


const cloudinary_routes = (app: express.Application)=> {
    
        app.post("/single",verifyAuthToken, upload.single('image'), store),
        app.post("/index",verifyAuthToken, index);
    app.get("/product/index",verifyAuthToken, index)
    app.get("/product/show/:id",verifyAuthToken, show)
    app.post("/product/create",verifyAuthToken, upload.single("image"), create)
}

export { cloudinary_routes} ;