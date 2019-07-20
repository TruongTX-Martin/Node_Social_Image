'use strict';

var db = require('../../models/index');
var User = db.user;
var authRepository = function authRepository() {

    var getAllUser = function getAllUser(req, res, next) {
        User.findAll().then(function (users) {
            // Send all customers to Client
            console.log('User:', users);
            res.send(users);
        });
    };

    return {
        getAllUser: getAllUser
    };
};
module.exports = authRepository();