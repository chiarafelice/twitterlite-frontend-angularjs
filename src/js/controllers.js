'use strict';

var twitterliteControllers = angular.module('twitterliteControllers', []);

twitterliteControllers.controller('TwitterCtrl', ['$scope', '$http', '$routeParams', 'TwitterService', function ($scope, $http, $routeParams, TwitterService) {
  	
	$scope.data = [];
	$scope.offset = 0; 
	$scope.limit = 10; 

  	$scope.postTweet = function() {

		$http.post( 'http://localhost:8080/twitterlite-ws/tweets?username=' + $scope.username + '&content=' + $scope.tweet.replace(/#/g,'%23'))
			.success(function( dataCallBack ) {
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
	  		}).error(function(data, status, headers, config) {
	  			console.log("error in post tweet");
	    	});
    };

    $scope.loadTweets = function() {
		$http.get( 'http://localhost:8080/twitterlite-ws/messages?offset='+ $scope.offset + '&limit=' + $scope.limit).success(function( dataCallBack ) {
	  		var preparedTweets = TwitterService.prepareTweets(dataCallBack);	

	  		for(var i = 0; i < preparedTweets.length; i++) {
	        	$scope.data.push(preparedTweets[i]);
	        }

	  		$scope.offset += $scope.limit;
	  	});    
	};

	$scope.loadTweets();

}]);

twitterliteControllers.controller('UserCtrl', ['$scope', '$http', '$routeParams', 'TwitterService', function ($scope, $http, $routeParams, TwitterService) {
  	
  	$scope.data = [];
	$scope.offset = 0; 
	$scope.limit = 10; 

  	$scope.loadTweets = function() {
	  	$http.get( 'http://localhost:8080/twitterlite-ws/messages/user?user='+$routeParams.user+'&offset='+ $scope.offset + '&limit=' + $scope.limit).success(function( dataCallBack ) {
	  		var preparedTweets = TwitterService.prepareTweets(dataCallBack);	

	  		for(var i = 0; i < preparedTweets.length; i++) {
	        	$scope.data.push(preparedTweets[i]);
	        }

	  		$scope.offset += $scope.limit;
		});
	};

	$scope.loadTweets();

}]);


twitterliteControllers.controller('HashTagCtrl', ['$scope', '$http', '$routeParams', 'TwitterService', function ($scope, $http, $routeParams, TwitterService) {
  	$scope.offset = 0; 
	$scope.limit = 10; 

  	$scope.loadTweets = function() {
  		$http.get( 'http://localhost:8080/twitterlite-ws/messages/hashtags?hashtags='+$routeParams.hashtag+'&offset='+ $scope.offset + '&limit=' + $scope.limit).success(function( dataCallBack ) {
	  		var preparedTweets = TwitterService.prepareTweets(dataCallBack);	

	  		for(var i = 0; i < preparedTweets.length; i++) {
	        	$scope.data.push(preparedTweets[i]);
	        }

	  		$scope.offset += $scope.limit;
		});
	};

	$scope.loadTweets();
}]);

