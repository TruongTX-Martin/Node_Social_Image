import authRepo from './AuthRepository';
const repositoryFactory = () => {
    const repos = [];
    const repositories = [
        { name: "auth", source:  authRepo}
    ];

    repositories.forEach(function(repo) {
        repos[repo.name] = repo.source;
    });
    return repos;
}

export default new repositoryFactory();