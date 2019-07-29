import reposFactory from '../../repositories/RepositoryFactory';
import express from 'express';
const  app = express();


app.get('/me', (req, res, next) => {
    reposFactory.user.getMe(req, res, next);
})

app.post('/me', (req, res, next) => {
    reposFactory.user.updateMe(req, res, next);
})

module.exports = app;