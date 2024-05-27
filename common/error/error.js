
class ResponseError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status;
    }
}

class RuntimeError extends ResponseError {
    constructor(message) {
        super(400, message);
    }
}

module.exports =  {
    RuntimeError,
    ResponseError
}