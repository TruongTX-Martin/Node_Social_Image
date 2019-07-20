'use strict';

var StatusCode = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    NOT_FOUND: 404
};

var GENERAL = {
    SECRET_KEY: 'SocialImage',
    TOKEN_EXPIRED: 24 * 60 * 60
};

module.exports = { StatusCode: StatusCode, GENERAL: GENERAL };