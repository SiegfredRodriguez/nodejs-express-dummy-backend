function isValid(data, validationFn) {
    return (data !== undefined && data !== null && validationFn(data));
}

const PG_ERROR_CODE_MESSAGE = {
    42703: 'Column unknown',
}

module.exports = {
    isValid: isValid,
    pgErrorMessages: PG_ERROR_CODE_MESSAGE
}