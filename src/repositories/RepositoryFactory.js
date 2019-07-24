import authRepo from './AuthRepository';
import postRepo from './PostRepository';
const repositoryFactory = () => {
    const repos = [];
    const repositories = [
        { name: "auth", source:  authRepo},
        { name: "post", source:  postRepo}
    ];

    repositories.forEach(function(repo) {
        repos[repo.name] = repo.source;
    });
    return repos;
}

export default new repositoryFactory();