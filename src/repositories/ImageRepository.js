import database from '../../models/index';
import Resize from './middleware/ResizeImage';
import path from 'path';
import {
    responseError,
} from '../utils';

const uploadImage = async (req, res) => {
    const imagePath = path.join(process.cwd(), '/public/images');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      res.send(responseError(false, null, 'Please provide an image'));
    }
    const filename = await fileUpload.save(req.file.buffer);
    return res.status(200).json({ name: filename });
}

const likeImage = (req, res, next) => {
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

const unlikeImage = (req, res, next) => {
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

const imageRepository = {
    uploadImage,
    likeImage,
    unlikeImage
}

export default imageRepository;


