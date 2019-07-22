import authRepo from './AuthRepository';
import albumRepo from './AlbumRepository';
const repositoryFactory = () => {
    const repos = [];
    const repositories = [
        { name: "auth", source:  authRepo},
        { name: "album", source:  albumRepo}
    ];

    repositories.forEach(function(repo) {
        repos[repo.name] = repo.source;
    });
    return repos;
}

export default new repositoryFactory();