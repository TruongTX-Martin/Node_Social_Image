const bcrypt = require('bcryptjs');
const  jwt  =  require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10);
const  { StatusCode, GENERAL }  = require('../constants');


const generatePasswordSync = (password) => {
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

const checkStatusToken = (req, res, err, decoded) => {
    if(err){
        res.send(responseUnAuthorization(false, null, 'Invalid token'));
        return false;
    }
    const expriedDate = decoded.exp;
    const currentDate = Math.floor(Date.now() / 1000);
    if(expriedDate < currentDate){
        res.send(responseError(false, null, 'Token expired'));
        return false;
    }
    return true;
}

const checkToken = (req, res) => {
    let token = req.get('authorization');
    if(!token){
        res.send(responseUnAuthorization(false, null, 'Not authorization'));
        return null;
    }
    token = token.replace('bearer','').trim();
    return token;
}

const responseError = (isSuccess = true , message = null, error = null) => {
    return {
        status: StatusCode.SUCCESS,
        isSuccess: isSuccess,
        message: message,
        error: error
    }
}

const responseUnAuthorization = (isSuccess = true , message = null, error = null) => {
    return {
        status: StatusCode.UN_AUTHORIZED,
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
    responseUnAuthorization,
    generatePasswordSync,
    comparePassword, 
    generateAccessToken,
    decodeToken,
    checkStatusToken,
    checkToken
};