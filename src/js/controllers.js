'use strict';

var twitterliteControllers = angular.module('twitterliteControllers', []);

twitterliteControllers.controller('TwitterCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  	
	$scope.data = [];
	$scope.offset = 0; 
	$scope.limit = 10; 
	$scope.test = 'Hello';
	$scope.username;
	$scope.tweet;

  	$scope.postTweet = function() {
		$http({
		    url: 'http://localhost:8080/twitterlite-ws/tweets', 
		    method: "POST",
		    params: {
		    	username: $scope.username,
		    	content: $scope.tweet.replace(/#/g,'%23')
		    }
		 }).success(function( dataCallBack ) {
				
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
	  		console.log('Error in POST tweet');
	    });
    };

	$scope.loadTweets = function() {
		$http({
		    url: 'http://localhost:8080/twitterlite-ws/messages', 
		    method: "GET",
		    params: {
		    	offset: $scope.offset,
		    	limit : $scope.limit
		    }
		 }).success(function( dataCallBack ) {
	  		for(var i = 0; i < dataCallBack.length; i++) {
	        	$scope.data.push(dataCallBack[i]);
	        }
	  		$scope.offset += $scope.limit;

	  	}).error(function(data, status, headers, config) {
	  			console.log('Error in LOAD tweets');
	    });    
	};

	$scope.loadTweets();

}]);

twitterliteControllers.controller('UserCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  	
  	$scope.data = [];
	$scope.offset = 0; 
	$scope.limit = 10; 

  	$scope.loadTweets = function() {
	  	$http({
		    url: 'http://localhost:8080/twitterlite-ws/messages/user', 
		    method: "GET",
		    params: {
		    	user: $routeParams.user,
		    	offset: $scope.offset,
		    	limit : $scope.limit
		    }
		 }).success(function( dataCallBack ) {

	  		for(var i = 0; i < dataCallBack.length; i++) {
	        	$scope.data.push(dataCallBack[i]);
	        }

	  		$scope.offset += $scope.limit;
		}).error(function(data, status, headers, config) {
	  		console.log('Error in GET USER request');
	    });
	};

	$scope.loadTweets();
}]);

twitterliteControllers.controller('MentionCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
 	$scope.data = [];
  	$scope.offset = 0; 
	$scope.limit = 10; 

  	$scope.loadTweets = function() {
  		$http({
		    url: 'http://localhost:8080/twitterlite-ws/messages/mention', 
		    method: "GET",
		    params: {
		    	mention: $routeParams.mention,
		    	offset: $scope.offset,
		    	limit : $scope.limit
		    }
		 }).success(function( dataCallBack ) {
	  		for(var i = 0; i < dataCallBack.length; i++) {
	        	$scope.data.push(dataCallBack[i]);
	        }

	  		$scope.offset += $scope.limit;
		}).error(function(data, status, headers, config) {
	  		console.log('Error in GET MENTION request');
	    });
	};

	$scope.loadTweets();
}]);

twitterliteControllers.controller('HashTagCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
 	$scope.data = [];
  	$scope.offset = 0; 
	$scope.limit = 10; 

  	$scope.loadTweets = function() {

		$http({
		    url: 'http://localhost:8080/twitterlite-ws/messages/hashtags', 
		    method: "GET",
		    params: {
		    	hashtags: $routeParams.hashtag,
		    	offset: $scope.offset,
		    	limit : $scope.limit
		    }
		 }).success(function( dataCallBack ) {

	  		for(var i = 0; i < dataCallBack.length; i++) {
	        	$scope.data.push(dataCallBack[i]);
	        }
	  		$scope.offset += $scope.limit;
		}).error(function(data, status, headers, config) {
	  		console.log('Error in GET HASHTAGS request');
	    });
	};

	$scope.loadTweets();

}]);

