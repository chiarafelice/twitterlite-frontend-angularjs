'use strict';

var twitterApp = angular.module('twitterApp', [
  'ngRoute',
  'twitterliteServices',
  'twitterliteControllers', 
  'twitterliteDirectives',
  'twitterliteFilters',
  'angularMoment'
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
        when('/mention/:mention', {
          templateUrl: 'tpl/content.html',
          controller: 'MentionCtrl'
		  }).
        otherwise({
          redirectTo: '/index'
      });
}]);

