'use strict';

var twitterApp = angular.module('twitterApp', [
  'ngRoute',
  'twitterliteServices',
  'twitterliteControllers', 
  'twitterliteDirectives',
  'twitterliteFilters',
  'ngSanitize'
]);

twitterApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/index', {
        templateUrl: 'tpl/frontpage.html',
         controller: 'TwitterCtrl'
      }).
       when('/user/:user', {
         templateUrl: 'tpl/content.html',
         controller: 'UserCtrl'
		}).
       when('/hashtag/:hashtag', {
         templateUrl: 'tpl/content.html',
         controller: 'HashTagCtrl'
		}).
       when('/linkify', {
         templateUrl: 'tpl/linkify.html',
         controller: 'TwitterCtrl'
    }).
       otherwise({
        redirectTo: '/index'
      });
}]);

