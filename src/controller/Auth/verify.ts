import {promisify} from 'util';
import * as Axios from 'axios';
import * as jsonwebtoken from 'jsonwebtoken';
const jwkToPem = require('jwk-to-pem');
import AppError from "../../services/errorHandlers/errors";
import express, { NextFunction, Request, Response } from "express";

export interface ClaimVerifyRequest {
  readonly token?: string;
}

export interface ClaimVerifyResult {
  readonly userName: string;
  readonly clientId: string;
  readonly isValid: boolean;
  readonly error?: any;
}

interface TokenHeader {
  kid: string;
  alg: string;
}
interface PublicKey {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}
interface PublicKeyMeta {
  instance: PublicKey;
  pem: string;
}

interface PublicKeys {
  keys: PublicKey[];
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta;
}

interface Claim {
  token_use: string;
  auth_time: number;
  iss: string;
  exp: number;
  username: string;
  client_id: string;
}

const cognitoPoolId = process.env.COGNITO_POOL_ID || '';
if (!cognitoPoolId) {
  throw new AppError('env var required for cognito pool',400);
}
const cognitoIssuer = `https://cognito-idp.us-east-1.amazonaws.com/${cognitoPoolId}`;

let cacheKeys: MapOfKidToPublicKey | undefined;
const getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`;
    const publicKeys = await Axios.default.get<PublicKeys>(url);
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = {instance: current, pem};
      return agg;
    }, {} as MapOfKidToPublicKey);
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};
let data = "";
const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

const handler = async (req: Request, res: Response, next: NextFunction) => {
 let result: ClaimVerifyResult;
  try {
    //console.log(`user claim verify invoked for ${JSON.stringify(request)}`);
    const token = req.headers.authorization;
    const tokenSections = (token || '').split('.');
    if (tokenSections.length < 2) {
      throw new AppError('requested token is invalid',401);
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON) as TokenHeader;
    const keys = await getPublicKeys();
    const key = keys[header.kid];
    if (key === undefined) {
      throw new AppError('claim made for unknown kid',401);
      }
     // console.log(key.)
    const claim = await verifyPromised(token) as unknown as Claim;
    const currentSeconds = Math.floor( (new Date()).valueOf() / 1000);
    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
      throw new AppError('claim is expired or invalid',401);
    }
    if (claim.iss !== cognitoIssuer) {
      throw new AppError('claim issuer is invalid',401);
    }
    if (claim.token_use !== 'access') {
      throw new AppError('claim use is not access',401);
    }
    console.log(`claim confirmed for ${claim.username}`);
      result = { userName: claim.username, clientId: claim.client_id, isValid: true };
      console.log(result)
     
  } catch (error) {
      result = { userName: '', clientId: '', error, isValid: false };
      
    }
    return res.status(200).json({
        success: true,
        data: result
    });
    
};

export {handler};