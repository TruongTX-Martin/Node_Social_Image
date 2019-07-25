import reposFactory from '../../repositories/RepositoryFactory';
import express from 'express';
import upload from '../../repositories/middleware/UploadMiddleware';
const  app = express();

app.post('/create', (req, res) => {
    reposFactory.post.createPost(req, res);
})

app.post('/upload_image', upload.single('image'), (req, res, next) => {
    reposFactory.post.uploadImage(req, res);
})

module.exports = app;