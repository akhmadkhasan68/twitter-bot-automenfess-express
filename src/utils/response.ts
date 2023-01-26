export class SuccessResponse {
    message: string;

    code: number;

    data: any | any[];

    static setSuccessRespose(message: string, code: number, data: any | any[]): SuccessResponse {
        return {
            message: message,
            code: code,
            data: data
        };
    }
}

export class ErrorResponse {
    message: string;

    code: number;

    static setErrorRespose(message: string, code: number, data: any | any[]): ErrorResponse {
        return {
            message: message,
            code: code,
        };
    }
}
