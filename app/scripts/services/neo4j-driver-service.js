'use strict';

angular.module('neo4jHackatonApp').service('Neo4j', function () {
    var self = this;
    self.driver = neo4j.driver;
});