export class ApiErrors {
    constructor(public code: number, public message: string){
        this.code = code;
        this.message = message;
    }

    static badRequest(msg: string) {
        return new ApiErrors(400, msg);
    }

    static internalError(msg: string) {
        return new ApiErrors(500, msg)
    }
}