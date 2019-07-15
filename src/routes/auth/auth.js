var express = require('express')
var app = express();
const { generatePassword, decryptPassword, responseError } = require('../../utils');

//sign up
app.post('/sign-up', (req, res, next) => {
    req.assert('email', 'A valid Email is required').isEmail();
    req.assert('password', 'Password cannot empty').is;
    const errors = req.validationErrors();
    if(!errors){
        const user = {
            email: req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim(),
        }
        generatePassword(user.password,(hash) => {
            req.getConnection((error, conn) => {
                conn.query("SELECT * FROM user WHERE email = '" +  user.email + "'", (err, rows, fields) => {
                    if(err) res.send(responseError(false, null, err));
                    if(rows.length > 0){
                        res.send(responseError(false, null, 'Your email register has exited. Please use other email to register'));
                    }else{
                        conn.query("INSERT INTO user (email, password) VALUES ('" + user.email + "','" + hash + "')", (err, results) => {
                            if(err) throw err;
                            res.send(responseError(true, null, 'Register success'))
                        })
                    }
                })
            })
        });
    }else {
        res.send(responseError(false, null, errors));
    }
})


//sign in

app.post('/sign-in', (req, res, next) => {
    
})

module.exports = app;