import database from '../../models/index';
import {
    responseError,
    responseData,
    checkStatusToken,
    checkToken,
    validateToken
} from '../utils';
import jwt from 'jsonwebtoken';

const Post = database.posts;
const PostLikes = database.post_likes;
const Comment = database.comments;
const Image = database.images;
const User = database.users;


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

const likePost = (req, res, next) => {
    validateToken(req, res, async (user) => {
        if(!user) return;
        const userId = user.id;
        const postId = req.sanitize('post_id').escape().trim();
        const postRow = await PostLikes.findAll({
            where: {
                user_id: userId,
                post_id: postId
            }
         })
        if(postRow.length > 0){
            res.send(responseError(false, null, 'User has liked this post'));
        }else{
            PostLikes.create({post_id: postId, user_id: userId  });
            res.send(responseError(true, null, 'Like post success'));
        }
    })
}

const unlikePost = (req, res, next) => {
    validateToken(req, res, async (user) => {
        if(!user) return;
        const userId = user.id;
        const postId = req.sanitize('post_id').escape().trim();
        const postRow = await PostLikes.findAll({
            where: {
                user_id: userId,
                post_id: postId
            }
         })
        if(postRow.length > 0){
            PostLikes.destroy({
                where: {
                    user_id: userId,
                    post_id: postId
                }
             })
            res.send(responseError(true, null, 'Unlike success'));
        }else{
            res.send(responseError(false, null, 'User does not like this post before'));
        }
    })
}
const commentPost = (req, res, next) => {
    validateToken(req, res, async (user) => {
        if(!user) return;
        const userId = user.id;
        const postId = req.sanitize('post_id').escape().trim();
        const comment = req.sanitize('comment').escape().trim();
        Comment.create({
            comment: comment,
            post_id: postId,
            user_id_comment: userId,
        })
        res.send(responseError(true, null, 'Comment success'));
    })
}

const getListPostHome = async (req, res, next) => {
    validateToken(req, res, async (user) => {
        if(!user) return;
        const postRow = await Post.findAll({
            include: [
                {model: Image},
                {model: User}
            ]
        });
        res.send(responseData(true, null, null, postRow));
    })
}



const postRepository = {
    createPost,
    likePost,
    unlikePost,
    commentPost,
    getListPostHome
}

export default postRepository;


