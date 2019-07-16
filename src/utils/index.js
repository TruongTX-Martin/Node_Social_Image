const bcrypt = require('bcryptjs');
const  jwt  =  require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10);
const  { StatusCode, GENERAL }  = require('../constants');


const generatePasswordSync = (password) => {
    console.log('Salt:', salt);
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, GENERAL.SECRET_KEY, {
        expiresIn:  GENERAL.TOKEN_EXPIRED
    });
}

const decodeToken = (token) => {
    jwt.verify(token, GENERAL.SECRET_KEY,(error, decode) => {
        if(error) throw new Error(error);
        console.log('Decode :', decode);
    })
}

const responseError = (isSuccess = true , message = null, error = null) => {
    return {
        status: StatusCode.SUCCESS,
        isSuccess: isSuccess,
        message: message,
        error: error
    }
}

const responseLogin = (isSuccess = true , message = null, error = null, token ) => {
    return {
        status: StatusCode.SUCCESS,
        isSuccess: isSuccess,
        message: message,
        error: error,
        token: token,
        expired_id: GENERAL.TOKEN_EXPIRED
    }
}

module.exports = { 
    responseError,
    responseLogin,
    generatePasswordSync,
    comparePassword, 
    generateAccessToken,
    decodeToken
};