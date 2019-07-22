import reposFactory from '../../repositories/RepositoryFactory';
import express from 'express';
const  app = express();

app.post('/create', (req, res, next) => {
    reposFactory.album.createAlbum(req, res, next);
})

module.exports = app;