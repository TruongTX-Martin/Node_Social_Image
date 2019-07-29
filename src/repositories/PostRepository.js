import database from '../../models/index';
import {
    responseError,
    checkStatusToken,
    checkToken
} from '../utils';
import jwt from 'jsonwebtoken';

const Post = database.posts;
const Image = database.images;


const createPost = async (req, res) => {
    const token = checkToken(req, res);
    if (!token) return;
    jwt.verify(token, 'SocialImage', async (err, decoded)  => {
        const status = checkStatusToken(req, res, err, decoded)
        if (!status) return;
        const title = req.sanitize('title').escape().trim();
        const images = req.sanitize('images').escape().trim();
        if(!title || title.length === 0){
            res.send(responseError(false, null, "TItle cannot empty"));
            return;
        }
        const newPost = await Post.create({ title: title, user_id: decoded.id});
        if(newPost && newPost._previousDataValues && newPost._previousDataValues.id){
            const postId = newPost._previousDataValues.id;
            if(images.length > 0){
                const arrayImage = images.split(',');
                const paramsImage = arrayImage.map(e => {
                    return {
                        path: e,
                        post_id: postId,
                    };
                });
                await Image.bulkCreate(paramsImage);
                res.send(responseError(true, null, "Create new post success"));
            }

        }else{
            res.send(responseError(false, null, "Create new post error"));
        }
    });
}

const postRepository = {
    createPost
}

export default postRepository;


