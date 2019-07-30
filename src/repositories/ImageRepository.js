import database from '../../models/index';
import Resize from './middleware/ResizeImage';
import path from 'path';
import {
    responseError,
} from '../utils';

const ImageLikes = database.image_likes;
const Comment = database.comments;

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
        const userId = user.id;
        const imageId = req.sanitize('image_id').escape().trim();
        const imageRow = await ImageLikes.findAll({
            where: {
                user_id: userId,
                image_id: imageId
            }
         })
        if(imageRow.length > 0){
            res.send(responseError(false, null, 'User has liked this image'));
        }else{
            ImageLikes.create({image_id: imageId, user_id: userId  });
            res.send(responseError(true, null, 'Like image success'));
        }
    })
}

const unlikeImage = (req, res, next) => {
    validateToken(req, res, async (user) => {
        if(!user) return;
        const userId = user.id;
        const imageId = req.sanitize('image_id').escape().trim();
        const imageRow = await ImageLikes.findAll({
            where: {
                user_id: userId,
                image_id: imageId
            }
         })
        if(imageRow.length > 0){
            ImageLikes.destroy({
                where: {
                    user_id: userId,
                    image_id: imageId
                }
             })
            res.send(responseError(true, null, 'Unlike success'));
        }else{
            res.send(responseError(false, null, 'User does not like this image before'));
        }
    })
}

const commentImage = (req, res, next) => {
    validateToken(req, res, async (user) => {
        if(!user) return;
        const userId = user.id;
        const imageId = req.sanitize('image_id').escape().trim();
        const comment = req.sanitize('comment').escape().trim();
        Comment.create({
            comment: comment,
            image_id: imageId,
            user_id_comment: userId,
        })
        res.send(responseError(true, null, 'Comment success'));
    })
}

const imageRepository = {
    uploadImage,
    likeImage,
    unlikeImage,
    commentImage
}

export default imageRepository;


