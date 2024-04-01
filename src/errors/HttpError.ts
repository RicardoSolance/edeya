import _httpCodes from '../helpers/httpCodes';

export const httpCodes = _httpCodes;

export default class HttpError extends Error {
    statusCode: number;

    constructor(code: number, message?: string) {
        super(message);
        this.statusCode = code;
    }
}
