"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
var secret = String(process.env.TOKEN_SECRET);
var token;
var pool_region = 'us-east-1';
var UserPoolId = "us-east-1_iuuMT9cCD";
var client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: "us-east-1" });
var clientId = "20r1pknr2ekk4pqma7t7b019ps";
var SecretKey = "qbqj0i3km0elebcsirne8aaljchv56car54sm2rvaege1a2e7ke";
var pems = {};
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token_1 = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
        if (!token_1) {
            return res.status(401).end();
        }
        var decoded = jsonwebtoken_1["default"].decode(token_1);
        console.log(decoded);
        next();
    }
    catch (error) {
        res.status(401);
        res.json({ error: error });
    }
};
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
exports["default"] = verifyAuthToken;