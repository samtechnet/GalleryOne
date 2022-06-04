import express, { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
const use=(fn: { (req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: express.Response<any, Record<string, any>>, next: express.NextFunction): Promise<express.Response<any, Record<string, any>>>; (arg0: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, arg1: express.Response<any, Record<string, any>>, arg2: express.NextFunction): Promise<any>; })=> {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    }
}

const used=(fn: { (req: express.Request< any, number|undefined>, res: express.Response<number|undefined>, next: express.NextFunction): Promise<number|undefined>})=> {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    }
}

const string=(fn: { (req: express.Request<any, string|undefined>, res: express.Response<string|undefined>, next: express.NextFunction): Promise<number|undefined>})=> {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    }
}
export { use, used,string }


/*
    const use = fn =>(req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
*/