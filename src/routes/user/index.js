import reposFactory from '../../repositories/RepositoryFactory';
import express from 'express';
const  app = express();


app.get('/me', (req, res, next) => {
    reposFactory.user.getMe(req, res, next);
})

app.post('/me', (req, res, next) => {
    reposFactory.user.updateMe(req, res, next);
})

app.get('/follow-status', (req, res, next) => {
    reposFactory.user.getFollowStatus(req, res, next);
})

app.post('/follow-user', (req, res, next) => {
    reposFactory.user.followUser(req, res, next);
})

app.post('/unfollow-user', (req, res, next) => {
    reposFactory.user.unFollowUser(req, res, next);
})

module.exports = app;