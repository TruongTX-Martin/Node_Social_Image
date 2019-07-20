'use strict';

var express = require('express');
var app = express();
var reposFactory = require('../../repositories/RepositoryFactory');

var _require = require('../../utils'),
    responseError = _require.responseError,
    responseLogin = _require.responseLogin,
    generatePasswordSync = _require.generatePasswordSync,
    comparePassword = _require.comparePassword,
    generateAccessToken = _require.generateAccessToken,
    decodeToken = _require.decodeToken;

//sign up


app.post('/sign-up', function (req, res, next) {
    req.assert('email', 'A valid Email is required').isEmail();
    req.assert('password', 'Password cannot empty').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        var user = {
            email: req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim()
        };
        var hash = generatePasswordSync(user.password);
        req.getConnection(function (error, conn) {
            var query = "SELECT * FROM user WHERE email = '" + user.email + "'";
            conn.query(query, function (err, rows, fields) {
                if (err) res.send(responseError(false, null, err));
                if (rows.length > 0) {
                    res.send(responseError(false, null, 'Your email register has exited. Please use other email to register'));
                } else {
                    conn.query("INSERT INTO user (email, password) VALUES ('" + user.email + "','" + hash + "')", function (err, results) {
                        if (err) throw err;
                        res.send(responseError(true, null, 'Register success'));
                    });
                }
            });
        });
    } else {
        res.send(responseError(false, null, errors));
    }
});

//sign in

app.post('/sign-in', function (req, res, next) {
    req.assert('email', 'A valid Email is required').isEmail();
    req.assert('password', 'Password cannot empty').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        var user = {
            email: req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim()
        };
        req.getConnection(function (error, conn) {
            var query = "SELECT * FROM user WHERE email = '" + user.email + "'";
            conn.query(query, function (err, rows, fields) {
                if (err) res.send(responseError(false, null, err));
                if (rows.length > 0) {
                    var hashPass = rows[0].password;
                    var match = comparePassword(user.password, hashPass);
                    if (match) {
                        var accessToken = generateAccessToken(rows[0].id);
                        res.send(responseLogin(true, null, 'Login success', accessToken));
                    } else {
                        res.send(responseError(false, null, 'Password wrong'));
                    }
                } else {
                    res.send(responseError(false, null, 'Email wrong'));
                }
            });
        });
    } else {
        res.send(responseError(false, null, errors));
    }
});

app.get('/get_users', function (req, res, next) {
    reposFactory.auth.getAllUser(req, res, next);
});

module.exports = app;