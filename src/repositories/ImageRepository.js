import database from '../../models/index';
import Resize from './middleware/ResizeImage';
import aws from 'aws-sdk';
import path from 'path';
import {
    responseError,
    validateToken
} from '../utils';

aws.config.update({
    accessKeyId: "AKIAJCRFESEQRHECM6AA",
    secretAccessKey: "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",
});
const s3 = new aws.S3();
const ImageLikes = database.image_likes;
const Comment = database.comments;

const uploadImage = async (req, res) => {
    validateToken(req, res, async (user) => {
        if (!user) return;
        const time = new Date().getTime();
        const newName = req.file.originalname.split('.');
        const extension = newName[newName.length - 1];
        const name = time + '.' + extension;
        const myBucket = 'socialimagemartin';
        const params = {
            Bucket: myBucket,
            Key: name,
            Body: req.file.buffer,
            ACL: 'public-read',
            ContentType: req.file.mimetype
        }
        s3.putObject(params, function (err, data) {
            if (err) {
                res.send(responseError(false, null, 'Something error'));
            } else {
                res.send(responseError(true, name, null));

            }
        });
    })
}

const likeImage = (req, res, next) => {
    validateToken(req, res, async (user) => {
        if (!user) return;
        const userId = user.id;
        const imageId = req.sanitize('image_id').escape().trim();
        const imageRow = await ImageLikes.findAll({
            where: {
                user_id: userId,
                image_id: imageId
            }
        })
        if (imageRow.length > 0) {
            res.send(responseError(false, null, 'User has liked this image'));
        } else {
            ImageLikes.create({ image_id: imageId, user_id: userId });
            res.send(responseError(true, null, 'Like image success'));
        }
    })
}

const unlikeImage = (req, res, next) => {
    validateToken(req, res, async (user) => {
        if (!user) return;
        const userId = user.id;
        const imageId = req.sanitize('image_id').escape().trim();
        const imageRow = await ImageLikes.findAll({
            where: {
                user_id: userId,
                image_id: imageId
            }
        })
        if (imageRow.length > 0) {
            ImageLikes.destroy({
                where: {
                    user_id: userId,
                    image_id: imageId
                }
            })
            res.send(responseError(true, null, 'Unlike success'));
        } else {
            res.send(responseError(false, null, 'User does not like this image before'));
        }
    })
}

const commentImage = (req, res, next) => {
    validateToken(req, res, async (user) => {
        if (!user) return;
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


