import reposFactory from '../../repositories/RepositoryFactory';
import express from 'express';
const  app = express();

app.post('/sign-up', (req, res, next) => {
    reposFactory.auth.signUp(req, res, next);
})

app.post('/sign-in', (req, res, next) => {
    reposFactory.auth.signIn(req, res, next);
})

module.exports = app;