import database from '../../models/index';
import {
    responseError,
    responseLogin,
    generatePasswordSync,
    comparePassword,
    generateAccessToken,
    decodeToken
} from '../utils';
const User = database.users;
const getAllUser = async (req, res, next) => {
    const users = await User.findAll();
    res.send(users);
}

const signIn = async (req, res, next) => {
    req.assert('email', 'A valid Email is required').isEmail();
    req.assert('password', 'Password cannot empty').notEmpty();
    const errors = req.validationErrors();
    if (!errors) {
        const user = {
            email: req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim(),
        }
        const users = await User.findOne({ where: { email: user.email } });
        if (users) {
            const currentUser = users.dataValues;
            const match = comparePassword(user.password, currentUser.password);
            if (match) {
                const accessToken = generateAccessToken(currentUser.id);
                res.send(responseLogin(true, null, 'Login success', accessToken))
            } else {
                res.send(responseError(false, null, 'Password wrong'))
            }
        } else {
            res.send(responseError(false, null, 'Email wrong'))
        }
    } else {
        res.send(responseError(false, null, errors));
    }
}

const signUp = async (req, res, next) => {
    req.assert('email', 'A valid Email is required').isEmail();
    req.assert('password', 'Password cannot empty').notEmpty();
    const errors = req.validationErrors();
    if (!errors) {
        const user = {
            email: req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim(),
        }
        const hash = generatePasswordSync(user.password);
        const users = await User.findOne({ where: { email: user.email } });
        if (users) {
            res.send(responseError(false, null, 'Your email register has exited. Please use other email to register'));
        } else {
            User.create({ email: user.email, password: hash, is_actived: false });
            res.send(responseError(true, null, 'Register success'))
        }
    } else {
        res.send(responseError(false, null, errors));
    }
}

const authRepository = {
    getAllUser,
    signIn,
    signUp
}

export default authRepository;


