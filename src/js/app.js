'use strict';

var twitterApp = angular.module('twitterApp', [
  'ngRoute',
  'twitterliteControllers'
]);

twitterApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/index', {
        templateUrl: 'tpl/frontpage.html',
         controller: 'TwitterCtrl'
      })
       .
       when('/user/:user', {
         templateUrl: 'tpl/content.html',
         controller: 'UserCtrl'
		})
		       .
       when('/hashtag/:hashtag', {
         templateUrl: 'tpl/content.html',
         controller: 'HashTagCtrl'
		})
      .otherwise({
        redirectTo: '/index'
      });
}]);