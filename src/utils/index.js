const bcrypt = require('bcrypt');
const saltRounds = 10;
const  { StatusCode }  = require('../constants');

const generatePassword = (password, result) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
        result(hash);
      });
}

const decryptPassword = (password, hash, result) => {
    bcrypt.compare(password, hash, function(err, res) {
        result(res);
    });
}

const responseError = (isSuccess = true , message = null, error = null) => {
    return {
        status: StatusCode.SUCCESS,
        isSuccess: isSuccess,
        message: message,
        error: error
    }
}

module.exports = { generatePassword, decryptPassword, responseError };