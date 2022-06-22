"use strict";
// const user_routes = (app: express.Application) => {
//     app.get("/users",index)
// }
// const now = (new Date()) {
//     const day = `${now.getDate()}`.padStart(2, '0');
//     const month = `${now.getMonth()}`.padStart(2, '0');
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();
// };
// console.log(now)
// export default {now}
/*
const used=(fn: { (req: express.Request< any, number|undefined>, res: express.Response<number|undefined>, next: express.NextFunction): Promise<number|undefined>})=> {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    }
}

// const command = new VerifySoftwareTokenCommand(params);


"success": true,
    "message": {
        "$metadata": {
            "httpStatusCode": 200,
            "requestId": "62ce5bfd-e25d-4348-a3e9-42b7eb612166",
            "attempts": 1,
            "totalRetryDelay": 0
        },
        "AuthenticationResult": {
            "AccessToken": "eyJraWQiOiJQRGtLUHVDa2JHNklCSWthY3JcL3I2VnFjUm13NzZPcUF6QUJiZ0JXVTIzQT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwMzQ2Yzc2Zi0zMjk0LTQzNDUtOGZlNy03NWI5YjM2NjI1NTMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9pdXVNVDljQ0QiLCJjbGllbnRfaWQiOiIyMHIxcGtucjJla2s0cHFtYTd0N2IwMTlwcyIsIm9yaWdpbl9qdGkiOiJjYjczY2MyMy1mY2E3LTQ3YTEtOWVjOC1lZWVjZTkxMDY5MzIiLCJldmVudF9pZCI6IjYyY2U1YmZkLWUyNWQtNDM0OC1hM2U5LTQyYjdlYjYxMjE2NiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NTQwODczMDQsImV4cCI6MTY1NDA5MDkwNCwiaWF0IjoxNjU0MDg3MzA0LCJqdGkiOiJkY2U4YmE1MS1mOTQ3LTQyMmItOWIyYi1hOWU3ODQyODEzZTkiLCJ1c2VybmFtZSI6IjAzNDZjNzZmLTMyOTQtNDM0NS04ZmU3LTc1YjliMzY2MjU1MyJ9.OopTUw538Qp23t8nR6Bw6aLoAhUHv7QbA3vioLWY_-NaDF-lzjsDLbWemLwPlB4zwqpq6cSdhjpy_LZTr7YBuID4XxK6gn_efy5Dfji5tqzn5HHwCSLKir2aQjsBb9ZA84cH2Rg6qV8ESG8m9Xs9_CVCBSSS-fdwubNtP2DqqcfwqKgW2OWpgr50bF5j9qU8XMfLafBdVjwN9rqCu8_VAIfpSwm-L6YHqCNcFGdwo56BvBP3X17d3lvvzIDSAtsemO57ukC-LJSn8gLO0ZWDFd2yvesZMwGcHygaARNJFErPRN3ekT-5y6lFrnSQGRN8cpfeKADhaXWgJ59xJXq75g",
            "ExpiresIn": 3600,
            "IdToken": "eyJraWQiOiJjR0J3bXhqMGR0UDRzUGdlR0VJXC96VlwvamFVUTRLYllZbSt4em1FSm8rOEE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMzQ2Yzc2Zi0zMjk0LTQzNDUtOGZlNy03NWI5YjM2NjI1NTMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfaXV1TVQ5Y0NEIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6IjAzNDZjNzZmLTMyOTQtNDM0NS04ZmU3LTc1YjliMzY2MjU1MyIsIm9yaWdpbl9qdGkiOiJjYjczY2MyMy1mY2E3LTQ3YTEtOWVjOC1lZWVjZTkxMDY5MzIiLCJhdWQiOiIyMHIxcGtucjJla2s0cHFtYTd0N2IwMTlwcyIsImV2ZW50X2lkIjoiNjJjZTViZmQtZTI1ZC00MzQ4LWEzZTktNDJiN2ViNjEyMTY2IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTQwODczMDQsInBob25lX251bWJlciI6IisyMzQ4MTYxMjI4OTQ2IiwiZXhwIjoxNjU0MDkwOTA0LCJpYXQiOjE2NTQwODczMDQsImp0aSI6IjdhMmFjNDdjLTk0MzctNDc0MS1hNGQ4LTc1ZGM4N2Q4ZTQ4YyIsImVtYWlsIjoidm9iYWNvYjczNEBzY2VhdGguY29tIn0.nKvXWp8sdcVN08OU37QxhoOA124jn885wcms6OwEbAjjY9XvWoTcwOrXSaQqMSvFYwIuAieqcfzNbNAAuWowzsJM-K4_QNlhyeJTIh2qAaHwG6pHUqqd7Y3Ay8sQ-m2JykTYP8JiwiN2yCe4iNlV2vvTbLVUC_c-aBOoV8ZpuGGgl80rUK0_VJAqUdj0HrmZefKoimbt3WqjwszvAaiG_C6XBn7POvTsxo3k00I8uy4M3WonfMPCLa5pcE14YmsNYmP5KQvCD6iBQvCQswn6Vosadx1wFSSxgTPAN2o5aFeCD3YScTeCKskDZh02xbop4Itnnil8HifrZPztiv6h2Q",
            "RefreshToken": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.kos7u1oJfSowUR4YdMDoLAzHKKfvh9AmyR1p7xZ7ChOfH2sbMmZfFIVAHKS7Q6x1sNLLstXwL1R8Dk1hsg9TiZihJT5ilvAvogvhqIz1UiKeOt8alV2IEK4iLyTOYUq4j4nEcw07Ag0KcEy_o9fpQwSuBcEqQM1Vb_7RCCEgsBbzhxIHY3IU3bApmZ9XVN5bobkzXFGQvXuS2d6SYFGMTSLyxhAKwH64eVLhchwYwweCcoBsWc9ci9m09hD2O_8YYk34Y_PN8xQjE3esb_-AuzorwpCRlJwwsCEAgRk2MS7IxjlE26NqdORzTH8WAwuFuXYkU_8LZ2Y1l76xnY0_Tw.dFxws1josrFehRwT.NBiN8xr_XJQKtzdo2zub5mYoTGFwPsBb4rSCYrdyI0s7FSaskYYdxeF2McX7fK-IMVqj1fv1t7bsrgVRZ763NIqEQoFQiJRoDIvilShapcWWpGxhvSxx5RMMHJ17au7BrhDUWG2zgO8hnaPahEJsOqyKXvgVzuobxpu_ZmGb0ZmT4pTuqPw5ED3vEq1IyIrvk2zSsjXP8xi-9mJhQ4jbi4AofHanmPfdW5lqnKTbHyGd89SXa-eoKg2QOKs2jUpNGpGXBhKFLgONZDr9a1c0FkoxcTj7TkPjACwHDAX_a602wu45ezYuIrBmpwC8rtFLObTVy2x4KOmY4WnCjHM2zqok9nQASZl1J-Cmbo9cGSa4qm_WmGCfSQGp-dPV6TougsANy64FoYjl2TL53ek7VsjEH1SWkq3kerBNzprDP1u4goe5bIiyf3FnRB-biYcYd8MyvzqNaTO-Olw0MZxPDCDftS_GuaFY2Oa6gSYfxW2Hm42W8WVg1QSmcoe_apfsHkeYKK1DD-34MGtSvVwVjLfkMvMKbMKGdNReXNxD1IFr7VhfBbdGJbBu3yoshNqHATi0FcXUZfq4lyHxktpFFCTlv0rsKgbYqhfJhUB_8WbtoRQo-_CU_UqMCxFJJpgFZQ-ulUxmWHtX5j1TgN5j2XVwBdRBzg-1lJorZnBeogywDMX5mXW4meKk0_2eyeosI8APEfkzROIOtNlwIUB2olCe8qT-weNrxpQrnZZ3qLQaafyaNOlhWjqk0KRJv7MRnoHsklLqglrWDf2w7doSECNAwU9YQaAUWvoys1FRn-V9Uiotbxh0_etT0Du2usAgRSDZ0X9ZR5iIfNYvwBOm9FycdCTCumZxsWQb1wnnnHNbvqda7tp9JAEQDBUuImqbi96RYle-8XtJ2rxTMU0qb8BqRG3FsrcqBX8qQIvR6YypEQRWN7RMg6fKWTH4FKVXVWHa_lQ2L_mHCalNIpCLM_8FGBPNl3DJWsqg6ktck4HRRSFo2-7Zlytmh1fxX4Dp18yAgUrWtU4z9qhobFb_V_urlmiHmRVqLnGiyGXF7RoGhoRnNHRrRYoyygIebdtZwGZiyae0txXHTTEievYHY37-LGEKgWfzO630WZBLLHiSQBm5x2ONYrPMRHNOAFNxuNeeHsJGrQNVPz4xIAOMhibaaPsD22sZGRrdjXwXEo5zC1g5whXf9wGO31jAn8_TLOg_hE85S54IFM23-6oDxDHvKtl9jUb_nAJ6d4B6XqO-vrlFghhTwbSOClI6QGj8JWm2K54YDY-S05n4yzsBQCWERx7QsOBelxrz5kL7O5NnjCjvqNfNw37NFQ.65_yuU8FuhKfvjRkh80imA",
            "TokenType": "Bearer"
        },
        "ChallengeParameters": {}
    }
}
*/ 
