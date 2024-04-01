import httpCodes from '../helpers/httpCodes';
import HttpError from './HttpError';

export default class InternalError extends HttpError {
    constructor(message?: string) {
        super(httpCodes.INTERNAL_SERVER_ERROR, message);
    }
}
