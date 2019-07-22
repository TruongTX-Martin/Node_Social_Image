import reposFactory from '../../repositories/RepositoryFactory';
import express from 'express';
import upload from '../../repositories/middleware/UploadMiddleware';
const  app = express();

app.post('/create', (req, res, next) => {
    reposFactory.album.createAlbum(req, res, next);
})

app.post('/upload_image', upload.single('image'), (req, res, next) => {
    reposFactory.album.uploadImage(req, res);
})

module.exports = app;