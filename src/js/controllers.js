'use strict';

var twitterliteControllers = angular.module('twitterliteControllers', []);

twitterliteControllers.controller('TwitterCtrl', ['$scope', function ($scope) {
  	
    $scope.data = 'hello chiara';
    console.log('hello');

}]);