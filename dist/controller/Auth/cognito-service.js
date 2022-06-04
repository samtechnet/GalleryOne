"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// function hashKey() {
//     const msg = userName + ClientId;
//     const dig = Hmac.new(str(ClientSecret).encoded('ut-8'),
//     ) 
// }
//const Cognito = new CognitoService();
//const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const poolData = {
    UserPoolId: "us-east-1_iuuMT9cCD",
    ClientId: "20r1pknr2ekk4pqma7t7b019ps",
    pool_region: 'us-east-1'
};
const userPoolId = "us-east-1_9GXbeFCXR";
const userName = "samlaja1292@gmail.com";
const ClientId = "20r1pknr2ekk4pqma7t7b019ps";
// class AuthCognito{
//     SignUp(req: Request, res: Response){
//         const result = validationResult(req);
//         console.log(req.body);
//         if (!result.isEmpty()) {
//             return res.status(422).json({errors: result.array()})
//         }
//         console.log('signup is valid');
//         // const cognito = new CognitoService();
//         // cognito.signUpUser(username, password, userAttr).then(success => {
//         //     if (success) {
//         //         res.status(200).end()
//         //     } else {
//         //         res.status(500).end()
//         //     }
//         // })
//     }
// }
//export default AuthCognito;
// function RegisterUser(){
//     // userPool.signUp('sampleEmail@gmail.com', 'SamplePassword123', function(err, result){
//     //     if (err) {
//     //         throw new AppError('unable to fetch user from database', 500);;
//     //     }
//     //     const cognitoUser = result.user;
//     //     console.log('user name is ' + cognitoUser.getUsername());
//     // });
// }
// function Login() {
//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username : 'sampleEmail@gmail.com',
//         Password : 'SamplePassword123',
//     });
//     var userData = {
//         Username : 'sampleEmail@gmail.com',
//         Pool : userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function (result) {
//             console.log('access token + ' + result.getAccessToken().getJwtToken());
//             console.log('id token + ' + result.getIdToken().getJwtToken());
//             console.log('refresh token + ' + result.getRefreshToken().getToken());
//         },
//         onFailure: function(err) {
//             console.log(err);
//         },
//     });
// }
// function update(username: String, password: any){
//     var attributeList = [];
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
//         Name: "custom:scope",
//         Value: "some new value"
//     }));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
//         Name: "name",
//         Value: "some new value"
//     }));
//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username: username,
//         Password: password,
//     });
//     var userData = {
//         Username: username,
//         Pool: userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//     cognitoUser.updateAttributes(attributeList, (err, result) => {
//         if (err) {
//             //handle error
//             throw new AppError('unable to update data', 500);
//         } else {
//             console.log(result);
//         }
//     });
// }
// function ValidateToken(token: string) {
//     request({
//         url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
//         json: true
//     }, function (error: any, response: { statusCode: number; }, body: { [x: string]: any; }) {
//         if (!error && response.statusCode === 200) {
//             pem = {};
//             var keys = body['keys'];
//             for(var i = 0; i < keys.length; i++) {
//                 //Convert each key to PEM
//                 var key_id = keys[i].kid;
//                 var modulus = keys[i].n;
//                 var exponent = keys[i].e;
//                 var key_type = keys[i].kty;
//                 var jwk = { kty: key_type, n: modulus, e: exponent};
//                 var pem = jwkToPem(jwk);
//                 pem[key_id] = pem;
//             }
//             //validate the token
//             var decodedJwt = jwt.decode(token, {complete: true});
//             if (!decodedJwt) {
//                 console.log("Not a valid JWT token");
//                 return;
//             }
//             var kid = decodedJwt.header.kid;
//             var pem = pem[kid];
//             if (!pem) {
//                 console.log('Invalid token');
//                 return;
//             }
//             jwt.verify(token, pem, function(err, payload) {
//                 if(err) {
//                     console.log("Invalid Token.");
//                 } else {
//                     console.log("Valid Token.");
//                     console.log(payload);
//                 }
//             });
//         } else {
//             console.log("Error! Unable to download JWKs");
//         }
//     });
// }
// function renew() {
//     const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: "your_refresh_token_from_a_previous_login"});
//     const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
//     const userData = {
//         Username: "sample@gmail.com",
//         Pool: userPool
//     };
//     const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//     cognitoUser.refreshSession(RefreshToken, (err, session) => {
//         if (err) {
//             console.log(err);
//         } else {
//             let retObj = {
//                 "access_token": session.accessToken.jwtToken,
//                 "id_token": session.idToken.jwtToken,
//                 "refresh_token": session.refreshToken.token,
//             }
//             console.log(retObj);
//         }
//     })
// }
// function DeleteUser(username: any, password: string,) {
//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username: username,
//         Password: password,
//     });
//     var userData = {
//         Username: username,
//         Pool: userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function (result) {
//             cognitoUser.deleteUser((err, result) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log("Successfully deleted the user.");
//                     console.log(result);
//                 }
//             });
//         },
//         onFailure: function (err) {
//             console.log(err);
//         },
//     });
// }
// function ChangePassword(username: any, password: string, newpassword: string) {
//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username: username,
//         Password: password,
//     });
//     var userData = {
//         Username: username,
//         Pool: userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function (result) {
//             cognitoUser.changePassword(password, newpassword, (err, result) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log("Successfully changed password of the user.");
//                     console.log(result);
//                 }
//             });
//         },
//         onFailure: function (err) {
//             console.log(err);
//         },
//     });
// }
//  RegisterUser, Login, update,ValidateToken, renew, ChangePassword
// function signUp(arg0: { userData: any; UserPoolId: string; }) {
//     throw new Error("Function not implemented.");
// }
