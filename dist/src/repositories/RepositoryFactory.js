"use strict";

var repositoryFactory = function repositoryFactory() {
    var repos = this;
    var repositories = [{ name: "auth", source: require('./AuthRepository') }];

    repositories.forEach(function (repo) {
        repos[repo.name] = repo.source;
    });
};

module.exports = new repositoryFactory();