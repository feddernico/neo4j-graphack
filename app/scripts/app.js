'use strict';

/**
 * @ngdoc overview
 * @name neo4jHackatonApp
 * @description
 * # neo4jHackatonApp
 *
 * Main module of the application.
 */
angular
  .module('neo4jHackatonApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
