const repositoryFactory = function() {
    const repos = this;
    const repositories = [
        { name: "auth", source:  require('./AuthRepository')}
    ];

    repositories.forEach(function(repo) {
        repos[repo.name] = repo.source;
     });
}

module.exports = new repositoryFactory();