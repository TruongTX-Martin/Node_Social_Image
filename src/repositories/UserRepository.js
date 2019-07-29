import database from '../../models/index';
import {
    validateToken,
    responseError
} from '../utils';
const User = database.users;
const Follow = database.follows;

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

const getFollowStatus = (req, res, next) => {
    validateToken(req, res, async (user) => {
        if(!user) return;
        const followerId = user.id;
        const followingId = req.sanitize('following_id').escape().trim();
        const followRow = await Follow.findAll({
            where: {
                follower_id: followerId,
                following_id: followingId
            }
         })
        if(followRow.length > 0){
            res.send(responseError(true, null, null));
        }else{
            res.send(responseError(false, null, null));
        }
    })
}

const followUser = (req, res, next) => {
    validateToken(req, res, async (user) => {
        if(!user) return;
        const followerId = user.id;
        const followingId = req.sanitize('following_id').escape().trim();
        const followRow = await Follow.findAll({
            where: {
                follower_id: followerId,
                following_id: followingId
            }
         })
        if(followRow.length > 0){
            res.send(responseError(false, null, 'User has followed'));
        }else{
            Follow.create({ follower_id: followerId, following_id: followingId });
            res.send(responseError(true, null, 'Follow success'));
        }
    })
}

const unFollowUser = (req, res, next) => {
    validateToken(req, res, async (user) => {
        if(!user) return;
        const followerId = user.id;
        const followingId = req.sanitize('following_id').escape().trim();
        const followRow = await Follow.findAll({
            where: {
                follower_id: followerId,
                following_id: followingId
            }
         })
        if(followRow.length > 0){
            Follow.destroy({
                where: {
                    follower_id: followerId,
                    following_id: followingId
                }
             })
            res.send(responseError(true, null, 'UnFollow successs'));
        }else{
            res.send(responseError(false, null, 'Follow status currently empty'));
        }
    })
}




const userRepository = {
    getMe,
    updateMe,
    getFollowStatus,
    followUser,
    unFollowUser
}

export default userRepository;


