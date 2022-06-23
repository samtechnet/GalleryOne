// import AmazonCognitoIdentity, { CognitoAccessToken } from "amazon-cognito-identity-js";
import AppError from "../../services/errorHandlers/errors";
import { CognitoIdentityProviderClient, SignUpCommand, ConfirmSignUpCommand, PasswordResetRequiredException, InitiateAuthCommand,ForgotPasswordCommand,ResendConfirmationCodeCommand,ConfirmForgotPasswordCommand,DeleteUserCommand } from "@aws-sdk/client-cognito-identity-provider";
//import { SSOClient, LogoutCommand } from "@aws-sdk/client-sso";
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
import { client } from "../database/database";
import { use, used,string,numberVoid}  from "../../services/errorHandlers/catchAsync";
import crypto from "crypto";


const clients = new CognitoIdentityProviderClient({ region: "us-east-1" });
const SSOClient = new CognitoIdentityProviderClient({ region: "us-east-1" }); 
const clientId: string = String(process.env.ClientId);
const SecretKey: string = String(process.env.SecretKey);
const saltRounds = Number(process.env.SALT_ROUNDS);
const pepper = String(process.env.BCRYPT_PASSWORD);



function generateHash(username: string): string{
 let hashKey = crypto.createHmac("SHA256", SecretKey)
        .update(username + clientId).digest('base64').toString()
    return hashKey;
}

const signUp = use(async (req: Request, res: Response) => {
    const {email, first_name, last_name, phone_number,password } = req.body;
    
    let userAttr = [];
    // userAttr.push({ Name: 'username', Value: first_name });
    // userAttr.push({ Name: 'last_name', Value: last_name });
    userAttr.push({ Name: 'phone_number', Value: phone_number });
    const hashPassword = await bcrypt.hash(password + pepper,saltRounds);
const params = {
    Username: email,
    Password: hashPassword,
    ClientId: clientId,
   UserAttributes: userAttr,
    SecretHash: generateHash(email), 
    } 
    !params && res.status(401).json("wrong credentials")
    const command = new SignUpCommand(params);
        const data = await clients.send(command);
        if (!data){
            res.status(401).end()
    }
    const conn = await client.connect();
      const sql =
        "INSERT INTO users (first_name,last_name,email,phone_number, password_digest) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const result = await conn.query(sql, [ first_name, last_name,email, phone_number,hashPassword,]);
          conn.release();
    if (result) {
        return res.status(200).json({
            success: true,
            data: result.rows[0],
            awsData: data,
            response: "User created successfully, please check your email for confirmation code",
        });
    } else {
        res.json({
            status: false,
            response: "Unsuccessful attempt to register user"
            }).status(401)
    } 
    throw new AppError("something went wrong",400)
})

const confirmSignUp = used(async (req: Request, res: Response) => {
    const { email, ConfirmCode } = req.body;
    const username =email
    const input = {
        Username: email,
        ConfirmationCode: ConfirmCode,
        ClientId: clientId,
        SecretHash: generateHash(email)
    }

    const command = new ConfirmSignUpCommand(input);
    const response = await clients.send(command);
    if (response) {
        return res.json({
            success: true,
            message: "Hurray! your email is valid and you are now a registered user",
            data: response,
        }).statusCode
    }

});

const resendConfirmationCode = used(async (req: Request, res: Response) => {
    const { email, phone_number } = req.body;
    let userAttr = [];
    //console.log(userAttr);
    // userAttr.push({ Name: 'first_name', Value: first_name });
    // userAttr.push({ Name: 'last_name', Value: last_name });
    userAttr.push({ Name: 'phone_number', Value: phone_number });
  

    const input = {
        Username: email,
        ClientId: clientId,
        UserAttributes: userAttr,
        SecretHash: generateHash(email)
    }
    const command = new ResendConfirmationCodeCommand(input);
    const response = await clients.send(command);
    if (response) {
        return res.json({
            success: true,
            message: response
        }).statusCode
    }

});

const signIn = used(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let username= email;
    const input = {
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
            "USERNAME": username,
            "PASSWORD": password,
            "SECRET_HASH": generateHash(username)
        },
        ClientId: clientId,
       
    }
    const command = new InitiateAuthCommand(input);
    const response = await clients.send(command);
    if (response) {
        return res.json({
           success: true,
            message: response.AuthenticationResult
        }).statusCode
    }
    console.log(response)
})

const deleteUser = numberVoid(async (req: Request, res: Response) => {
    
    const authorizationHeader = req.headers.authorization;
    
    if (authorizationHeader) {
        const token = authorizationHeader?.split(" ")[1];
    const input = {
        AccessToken: token
        }
        const command = new DeleteUserCommand(input);
        const response = await clients.send(command);
        console.log(response)
    if (response) {
        const conn = await client.connect();
      const sql ="DELETE FROM users WHERE email=$1";
    }
    } else {
        return res.status(401).json("Token is not valid")
    }
    
    // if (response) {
    //     return res.json({
    //        success: true,
    //         message: response
    //     }).statusCode
    // }
    
})
const signOut = async (req: Request, res: Response) => {
    const {  } = req.body;
    const input = {
       // AccessToken: accessToken
        }
       
       
    
    // const command = new LogoutCommand(input);
    // const response = await client.send(command);
//     if (response) {
//         return res.json({
//            success: true,
//             message: response
//         }).statusCode
//     }
 }
 const forgotPassword = string(async (req: Request, res: Response) => {
    const { email} = req.body;
     const input = {
         Username: email,
         ClientId: clientId,
         SecretHash: generateHash(email)
     };
    const command = new ForgotPasswordCommand(input);
    const response = await clients.send(command);
    if (response) {
        return res.json({
           success: true,
            message: "Check your mail for a password reset code",
            data: response.CodeDeliveryDetails
        }).statusCode
    }
 })

 const confirmForgotPassword = string(async (req: Request, res: Response) => {
     const { email, newpassword, code } = req.body;
     const hashPassword = await bcrypt.hash(newpassword + pepper,saltRounds);
     const input = {
         Username: email,
         Password: hashPassword,
         ConfirmationCode: code,
         ClientId: clientId,
         SecretHash: generateHash(email)
     };
    const command = new ConfirmForgotPasswordCommand(input);
     const response = await clients.send(command);
     if (!response){
        res.status(401).end()
}
const conn = await client.connect();
  const sql =
    "UPDATE users SET password_digest= $1 WHERE email=$2";
    const result = await conn.query(sql, [email,hashPassword,]);
      conn.release();
if (result) {
    return res.status(200).json({
        success: true,
        data: result.rows[0],
        awsData: response.$metadata,
        response: "successfully changed your password",
    }).statusCode;
} else {
    res.json({
        status: false,
        response: "Unseccfully attempt to change password"
        }).status(401)
} 
throw new AppError("something went wrong",400)

})

const test = async (req: Request, res: Response) => {
    return res.json(" testing is okay ")
}




export { signUp, confirmSignUp,signIn,forgotPassword,resendConfirmationCode,confirmForgotPassword,test };
