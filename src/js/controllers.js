'use strict';

var twitterliteControllers = angular.module('twitterliteControllers', []);

twitterliteControllers.controller('TwitterCtrl', ['$scope', '$http', '$routeParams', 'TwitterService', function ($scope, $http, $routeParams, TwitterService) {
  	
	$scope.data = [];

  	$http.get( 'http://localhost:8080/twitterlite-ws/messages?offset=0&limit=22').success(function( dataCallBack ) {
  		// $scope.data = prepareTweets(dataCallBack);
  		$scope.data = TwitterService.prepareTweets(dataCallBack);	
  	});
}]);


twitterliteControllers.controller('UserCtrl', ['$scope', '$http', '$routeParams', 'TwitterService', function ($scope, $http, $routeParams, TwitterService) {
  	
  	$scope.data = [];

  	$http.get( 'http://localhost:8080/twitterlite-ws/messages/user?user='+$routeParams.user+'&offset=0&limit=10').success(function( dataCallBack ) {
  		$scope.data = TwitterService.prepareTweets(dataCallBack);

	 });
}]);


twitterliteControllers.controller('HashTagCtrl', ['$scope', '$http', '$routeParams', 'TwitterService', function ($scope, $http, $routeParams, TwitterService) {
  	
  	$scope.data = [];

  	$http.get( 'http://localhost:8080/twitterlite-ws/messages/hashtags?hashtags='+$routeParams.hashtag+'&offset=0&limit=10').success(function( dataCallBack ) {
		  		$scope.data = TwitterService.prepareTweets(dataCallBack);
	 });
}]);

