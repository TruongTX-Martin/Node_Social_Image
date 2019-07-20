var express = require('express')
var app = express();
const reposFactory = require('../../repositories/RepositoryFactory');
const { 
    responseError,
    responseLogin,
    generatePasswordSync,
    comparePassword,
    generateAccessToken,
    decodeToken
} = require('../../utils');

//sign up
app.post('/sign-up', (req, res, next) => {
    req.assert('email', 'A valid Email is required').isEmail();
    req.assert('password', 'Password cannot empty').notEmpty();
    const errors = req.validationErrors();
    if (!errors) {
        const user = {
            email: req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim(),
        }
        const hash = generatePasswordSync(user.password);
        req.getConnection((error, conn) => {
            const query = "SELECT * FROM user WHERE email = '" + user.email + "'";
            conn.query(query, (err, rows, fields) => {
                if (err) res.send(responseError(false, null, err));
                if (rows.length > 0) {
                    res.send(responseError(false, null, 'Your email register has exited. Please use other email to register'));
                } else {
                    conn.query("INSERT INTO user (email, password) VALUES ('" + user.email + "','" + hash + "')", (err, results) => {
                        if (err) throw err;
                        res.send(responseError(true, null, 'Register success'))
                    })
                }
            })
        })
    } else {
        res.send(responseError(false, null, errors));
    }
})


//sign in

app.post('/sign-in', (req, res, next) => {
    req.assert('email', 'A valid Email is required').isEmail();
    req.assert('password', 'Password cannot empty').notEmpty();
    const errors = req.validationErrors();
    if (!errors) {
        const user = {
            email: req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim(),
        }
        req.getConnection((error, conn) => {
            const query = "SELECT * FROM user WHERE email = '" + user.email + "'";
            conn.query(query, (err, rows, fields) => {
                if (err) res.send(responseError(false, null, err));
                if (rows.length > 0) {
                    const hashPass = rows[0].password;
                    const match = comparePassword(user.password, hashPass);
                    if(match){
                        const accessToken = generateAccessToken(rows[0].id);
                        res.send(responseLogin(true, null, 'Login success', accessToken))
                    }else{
                        res.send(responseError(false, null, 'Password wrong'))
                    }
                } else {
                    res.send(responseError(false, null, 'Email wrong'))
                }
            })
        })
    } else {
        res.send(responseError(false, null, errors));
    }
})

app.get('/get_users', (req, res, next) => {
    reposFactory.auth.getAllUser(req, res, next);
})



module.exports = app;