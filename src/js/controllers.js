'use strict';

var twitterliteControllers = angular.module('twitterliteControllers', []);

twitterliteControllers.controller('TwitterCtrl', ['$scope', '$http', function ($scope ,$http) {
  	
  	$http.get( 'http://localhost:8080/twitterlite-ws/messages?offset=0&limit=22').success(function( dataCallBack ) {
		console.log(dataCallBack);
		 $scope.data = {messages:dataCallBack};
	 });
}]);


twitterliteControllers.controller('UserCtrl', ['$scope', '$http', '$routeParams',
function ($scope ,$http,$routeParams) {
  	
  	$http.get( 'http://localhost:8080/twitterlite-ws/messages/user?user='+$routeParams.user+'&offset=0&limit=10').success(function( dataCallBack ) {
		console.log(dataCallBack);
		 $scope.data = {messages:dataCallBack};
	 });
}]);

twitterliteControllers.controller('HashTagCtrl', ['$scope', '$http', '$routeParams',
function ($scope ,$http,$routeParams) {
  	
  	$http.get( 'http://localhost:8080/twitterlite-ws/messages/hashtags?hashtags='+$routeParams.hashtag+'&offset=0&limit=10').success(function( dataCallBack ) {
		console.log(dataCallBack);
		 $scope.data = {messages:dataCallBack};
	 });
}]);


