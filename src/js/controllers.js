'use strict';

var twitterliteControllers = angular.module('twitterliteControllers', []);

twitterliteControllers.controller('TwitterCtrl', ['$scope', '$http', '$routeParams', 'TwitterService', function ($scope, $http, $routeParams, TwitterService) {
  	
	$scope.data = [];

  	$http.get( 'http://localhost:8080/twitterlite-ws/messages?offset=0&limit=22').success(function( dataCallBack ) {
  		// $scope.data = prepareTweets(dataCallBack);
  		$scope.data = TwitterService.prepareTweets(dataCallBack);	
  	});

  	$scope.postTweet = function() {

		$http.post( 'http://localhost:8080/twitterlite-ws/tweets?username=' + $scope.username + '&content=' + $scope.tweet.replace(/#/g,'%23')).success(function( dataCallBack ) {
			var tweetData = {
	              username: $scope.username,
	              content: $scope.tweet
	        };

	        var x = [];

	        x.push(tweetData);
	        var preparedTweet = TwitterService.prepareTweets(x);

	        for(var i = 0; i < preparedTweet.length; i++) {
	        	$scope.data.unshift(preparedTweet[i]);
	        }

			$scope.username = '';
			$scope.tweet = '';
  		});
    };

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

