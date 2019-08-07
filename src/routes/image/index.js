import reposFactory from '../../repositories/RepositoryFactory';
import express from 'express';
import upload from '../../repositories/middleware/UploadMiddleware';
const  app = express();


app.post('/upload_image', upload.single('image'), (req, res, next) => {
    console.log('Upload image em nhe');
    reposFactory.image.uploadImage(req, res);
})

app.post('/like', (req, res) => {
    reposFactory.image.likeImage(req, res);
})

app.post('/un-like', (req, res) => {
    reposFactory.image.unlikeImage(req, res);
})

module.exports = app;