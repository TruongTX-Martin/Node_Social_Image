const db = require('../../models/index');
const User = db.user;
const authRepository = function () {

    const getAllUser = function (req, res, next) {
        console.log('Auth repository get all user');
        User.findAll().then(users => {
            // Send all customers to Client
            console.log('User:', users);
            res.send(users);
        });
    }

    return {
        getAllUser
    };
}

module.exports = authRepository();

