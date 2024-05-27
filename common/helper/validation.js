const { RuntimeError} = require('../error/error');

module.exports = validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    })
    if (result.error) {
        throw new RuntimeError(result.error.message);
    } else {
        return result.value;
    }
}

