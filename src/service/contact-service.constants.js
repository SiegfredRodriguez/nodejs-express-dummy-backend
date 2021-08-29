// { status: ERROR_STATUS, message: 'error_message' }
const ERROR_STATUS = Object.seal({
    DATA_STORE_EXCEPTION: 1000,
    NOT_FOUND: 1001,
    BAD_DATA: 1002
});

module.exports = {
    ERR_STATUS: ERROR_STATUS,
};