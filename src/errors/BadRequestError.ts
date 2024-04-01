import httpCodes from '../helpers/httpCodes';
import HttpError from './HttpError';

export default class BadRequestError extends HttpError {
    constructor(message?: string) {
        super(httpCodes.BAD_REQUEST, message);
    }
}
