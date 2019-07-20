'use strict';

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10);

var _require = require('../constants'),
    StatusCode = _require.StatusCode,
    GENERAL = _require.GENERAL;

var generatePasswordSync = function generatePasswordSync(password) {
    console.log('Salt:', salt);
    return bcrypt.hashSync(password, salt);
};

var comparePassword = function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
};

var generateAccessToken = function generateAccessToken(userId) {
    return jwt.sign({ id: userId }, GENERAL.SECRET_KEY, {
        expiresIn: GENERAL.TOKEN_EXPIRED
    });
};

var decodeToken = function decodeToken(token) {
    jwt.verify(token, GENERAL.SECRET_KEY, function (error, decode) {
        if (error) throw new Error(error);
        console.log('Decode :', decode);
    });
};

var responseError = function responseError() {
    var isSuccess = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return {
        status: StatusCode.SUCCESS,
        isSuccess: isSuccess,
        message: message,
        error: error
    };
};

var responseLogin = function responseLogin() {
    var isSuccess = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var token = arguments[3];

    return {
        status: StatusCode.SUCCESS,
        isSuccess: isSuccess,
        message: message,
        error: error,
        token: token,
        expired_id: GENERAL.TOKEN_EXPIRED
    };
};

module.exports = {
    responseError: responseError,
    responseLogin: responseLogin,
    generatePasswordSync: generatePasswordSync,
    comparePassword: comparePassword,
    generateAccessToken: generateAccessToken,
    decodeToken: decodeToken
};