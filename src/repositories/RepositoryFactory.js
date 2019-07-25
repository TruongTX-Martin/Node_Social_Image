import authRepo from './AuthRepository';
import postRepo from './PostRepository';
import imageRepo from './ImageRepository';
import userRepo from './UserRepository';
const repositoryFactory = () => {
    const repos = [];
    const repositories = [
        { name: "auth", source:  authRepo},
        { name: "post", source:  postRepo},
        { name: "image", source:  imageRepo},
        { name: "user", source:  userRepo},
    ];

    repositories.forEach(function(repo) {
        repos[repo.name] = repo.source;
    });
    return repos;
}

export default new repositoryFactory();