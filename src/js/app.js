'use strict';

var twitterApp = angular.module('twitterApp', [
  'ngRoute',
  'twitterliteControllers'
]);

twitterApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/chiara', {
        templateUrl: 'tpl/frontpage.html'
        // controller: 'TwitterCtrl'
      })
      // .
      // when('/user/:user', {
      //   templateUrl: 'partials/content.html',
      //   controller: 'TwitterCtrl'
      // })
      .
      otherwise({
        redirectTo: '/chiara'
      });
}]);