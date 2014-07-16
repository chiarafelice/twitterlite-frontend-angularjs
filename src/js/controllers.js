'use strict';

var twitterliteControllers = angular.module('twitterliteControllers', []);

twitterliteControllers.controller('TwitterCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  	
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

		        for(var i = 0; i < x.length; i++) {
		        	$scope.data.unshift(x[i]);
		        }

				$scope.username = '';
				$scope.tweet = '';

	  		}).error(function(data, status, headers, config) {
	  			console.log("error in post tweet");
	    	});
    };

    $scope.loadTweets = function() {
		$http.get( 'http://localhost:8080/twitterlite-ws/messages?offset='+ $scope.offset + '&limit=' + $scope.limit).success(function( dataCallBack ) {

	  		for(var i = 0; i < dataCallBack.length; i++) {
	        	$scope.data.push(dataCallBack[i]);
	        }

	  		$scope.offset += $scope.limit;
	  	});    
	};

	$scope.loadTweets();

	$scope.toDate = function(timestamp) {
		if(timestamp) {
			return moment.unix(timestamp).format('MMMM Do YYYY, h:mm a');
		} else {
			return '..now';
		}
	};
}]);

twitterliteControllers.controller('UserCtrl', ['$scope', '$http', '$routeParams', 'TwitterService', function ($scope, $http, $routeParams, TwitterService) {
  	
  	$scope.data = [];
	$scope.offset = 0; 
	$scope.limit = 10; 

  	$scope.loadTweets = function() {
	  	$http.get( 'http://localhost:8080/twitterlite-ws/messages/user?user='+$routeParams.user+'&offset='+ $scope.offset + '&limit=' + $scope.limit).success(function( dataCallBack ) {

	  		for(var i = 0; i < dataCallBack.length; i++) {
	        	$scope.data.push(dataCallBack[i]);
	        }

	  		$scope.offset += $scope.limit;
		});
	};

	$scope.loadTweets();

	$scope.toDate = function(timestamp) {
		return moment.unix(timestamp).format('MMMM Do YYYY, h:mm a');
	}

}]);


twitterliteControllers.controller('HashTagCtrl', ['$scope', '$http', '$routeParams', 'TwitterService', function ($scope, $http, $routeParams, TwitterService) {
 	$scope.data = [];
  	$scope.offset = 0; 
	$scope.limit = 10; 

  	$scope.loadTweets = function() {
  		$http.get( 'http://localhost:8080/twitterlite-ws/messages/hashtags?hashtags='+$routeParams.hashtag+'&offset='+ $scope.offset + '&limit=' + $scope.limit).success(function( dataCallBack ) {

	  		for(var i = 0; i < dataCallBack.length; i++) {
	        	$scope.data.push(dataCallBack[i]);
	        }

	  		$scope.offset += $scope.limit;
		});
	};

	$scope.loadTweets();

	$scope.toDate = function(timestamp) {
		return moment.unix(timestamp).format('MMMM Do YYYY, h:mm a');
	}
}]);

