import database from '../../models/index';
import {
    validateToken,
    responseError
} from '../utils';
const User = database.users;

const getMe =  (req, res, next) => {
    validateToken(req, res, async (user) => {
        if(!user) return;
        const currentUser = await User.findByPk(user.id);
        if(currentUser){
            const result = currentUser.dataValues;
            delete result.password;
            res.send(responseError(true,JSON.stringify(result), null));
        }else{
            res.send(responseError(false, null, "User not found"));
        }
    })
}

const updateMe =  (req, res, next) => {
    validateToken(req, res, async (user) => {
        if(!user) return;
        const currentUser = await User.findByPk(user.id);
        if(currentUser){
            const imageProfile = req.sanitize('profile').escape().trim();
            User.update(
                { profile_image: imageProfile},
                { where: { id: user.id}}
            )
            res.send(responseError(true, 'Update user success', null));
        }else{
            res.send(responseError(false, null, "User not found"));
        }
    })
}




const userRepository = {
    getMe,
    updateMe
}

export default userRepository;


