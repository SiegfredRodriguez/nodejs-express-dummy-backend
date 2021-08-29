function isValid(data, validationFn) {
    return (data !== undefined && data !== null && validationFn(data));
}

module.exports = {
    isValid: isValid,
}