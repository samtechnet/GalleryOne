import {v2 as cloudinary } from "cloudinary";
import { use, used, string, image } from "../../services/errorHandlers/catchAsync";
import express, { Request, Response, NextFunction } from 'express';
import { Transform } from 'stream';
import multer from "multer";
import path from "path";
import fs from "fs";


const appdir = process.cwd();
cloudinary.config({ 
    cloud_name: 'dsl47cce0', 
    api_key: '356752717168943', 
    api_secret: 'hTZNQdVuOn4HxTv6WZTqlrNGqAg',
    secure: true
});

type file = {
    mimetype: string;
}
  

const cloud = async (path: string, myFiles: string): Promise<string> => {
    const uploader = await cloudinary.uploader.upload(path, { upload_preset: myFiles });
   // console.log(upload)
    return uploader.secure_url
}
//const storedImages = path.join(appdir, "/src/services/cloudinary/images")
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/")
    },
    filename: (req, file, cb) => {
       // console.log(file + " from multer storage engine");
        cb(null, Date.now( ) + '--' + file.originalname)
    }
});
const fileFilter = (req: Request, file: file, cb: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb({ message: `Unspported file format ${file.mimetype}` });
    }
};

const upload = multer({ storage: fileStorageEngine, limits: {fileSize: 4200 * 3800}, fileFilter });

const store = image(async (req: Request, res: Response) => {
   
    const result = req.file;
    res.status(200).json({
        message: "Single file upload success",
        data: result?.path
    })
});
export {upload, store, cloud} ;

