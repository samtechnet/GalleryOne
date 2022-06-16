import Jwt, { JwtPayload } from "jsonwebtoken";
import express, { NextFunction, Request, response, Response } from "express";
import jwkToPem from "jwk-to-pem";
import fetch from "node-fetch";
import { CognitoIdentityProviderClient, VerifySoftwareTokenCommand, AssociateSoftwareTokenCommand } from "@aws-sdk/client-cognito-identity-provider";
import { use, used } from "../../services/errorHandlers/catchAsync";
import AppError from "../../services/errorHandlers/errors";


const secret = String(process.env.TOKEN_SECRET);
let token: String;
const pool_region= 'us-east-1';
const UserPoolId = "us-east-1_iuuMT9cCD";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
const clientId: string = "20r1pknr2ekk4pqma7t7b019ps";
const SecretKey: string = "qbqj0i3km0elebcsirne8aaljchv56car54sm2rvaege1a2e7ke";
let pems = {};


const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token= authorizationHeader.split(" ")[1];
    const token2 = authorizationHeader?.split(" ")[2];
    const token3 = authorizationHeader?.split(" ")[3];
    if (!token) {

      res.writeHead(401).end();
    } else {
      const decoded = Jwt.decode(token);
      const keys=decoded
      //const kid= decoded.payload;
     // const pem = pems[]
     // console.log(kid.username);
      console.log(decoded)
     
    }
    //console.log(decoded)
    
    //console.log(decoded.username)
    //console.log(decoded);
    //console.log(username);
    next();
  } catch (error) {
  
    throw new AppError(`could not verify with ${error}`, 400)
  }
};
/*
{
  sub: '0346c76f-3294-4345-8fe7-75b9b3662553',
  iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_iuuMT9cCD',
  client_id: '20r1pknr2ekk4pqma7t7b019ps',
  origin_jti: 'd42143bd-0321-40a1-9c9e-c2ab8f0dd088',
  event_id: '3b16bb6e-816d-4e9b-9102-461bd496a4d7',
  token_use: 'access',
  scope: 'aws.cognito.signin.user.admin',
  auth_time: 1654198470,
  exp: 1654202070,
  iat: 1654198470,
  jti: 'f62123e6-ca1e-48d7-befc-734a5b71e678',
  username: '0346c76f-3294-4345-8fe7-75b9b3662553'
}*/
// const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
//   try {

//     const authorizationHeader = req.headers.authorization;
//     const token = authorizationHeader?.split(" ")[1];
//     if (!token) {
//       return res.status(401).end();
//     }
//     const params = {
//       AccessToken: token,
//       Session: "",
//     }
//     const command = new AssociateSoftwareTokenCommand(params);

//     const response = await client.send(command);
//     console.log(response)
//     if (!response) {
//       return res.status(401).end()
//     }
//     return res.json({
//     message : response
//   }).statusCode
//   } catch (error) {
//     next(error) ;
//   }
// }
//   try {
//     const authorizationHeader = req.headers.authorization;
//     const token = authorizationHeader?.split(" ")[1];
//     console.log(token);
//     if (!token) response.status(401).end();

//     let decoded: any = Jwt.verify(token, { complete: true });
//     if (!decoded) {
//       response.status(401).end
//     }

//     let kid = decoded.header.kid;
//     let pem = pems[kid]
//     if (!pem) {
//       response.status(401).end()
//     }

//     Jwt.verify(token, pem, (err, payload) => {
//       if (err) {
//         response.status(401).end()
//       }
//       next()
//     })

//     next();
//   } catch (error) {
//     res.status(401);
//     res.json({ error });
//   }
//   const setUp = async ()=>{
//     const URL = `https://cognito-idp.{${pool_region}}.amazonaws.com/{${UserPoolId}}/.well-known/jwks.json`
//     try {
//       const response = await fetch(URL);
//       console.log()
//       if (!response) {
//         throw ` request is not successful`
//       }
//       const data = await response.json();
//       const { keys } = data;
//       for (let index = 0; index < keys.lenght; index++){
//         const key = keys[index]
//         const key_id = key.kid
//         const modulus = key.n;
//         const exponent = key.e;
//         const key_type = key.kty
//         const jwk = { kty: key_type, n: modulus, e: exponent }
//         const pem = jwkToPem(jwk);
//         pems[key_id]= pem
//       }
//       console.log(" got all pems")
//     } catch (error) {
//      console.log(" sorry could not fetch jwk")
//     }
//   };
  
//   setUp();
//};

export default verifyAuthToken;