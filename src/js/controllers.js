'use strict';

var twitterliteControllers = angular.module('twitterliteControllers', []);

twitterliteControllers.controller('TwitterCtrl', ['$scope', '$http', '$routeParams', 'tweets', function ($scope, $http, $routeParams, tweets) {
    
    $scope.data = [];
    $scope.offset = 0; 
    $scope.limit = 10; 
    $scope.username = '';
    $scope.tweet = '';

    $scope.postTweet = function() {
        tweets.postTweet($scope.username, $scope.tweet).success(function(dataCallBack) {
            $scope.data.unshift({
                username: $scope.username,
                content: $scope.tweet
            });

            $scope.offset += 1;
            $scope.username = '';
            $scope.tweet = '';
        }).error(function(data, status, headers, config) {
            console.log('Error in POST tweet');
        });
    };

    $scope.loadTweets = function() {
       tweets.getAllTweets($scope.offset, $scope.limit).success(function(dataCallBack) {
            $scope.data = $scope.data.concat(dataCallBack);
            $scope.offset += $scope.limit;
        });
    };
    $scope.loadTweets();
}]);

twitterliteControllers.controller('UserCtrl', ['$scope', '$http', '$routeParams', 'tweets', function ($scope, $http, $routeParams, tweets) {
    
    $scope.data = [];
    $scope.offset = 0; 
    $scope.limit = 10; 

    $scope.loadTweets = function() {

        tweets.getAllUserTweets($routeParams.user, $scope.offset, $scope.limit).success(function( dataCallBack ) {
            $scope.data = $scope.data.concat(dataCallBack);
            $scope.offset += $scope.limit;
        }).error(function(data, status, headers, config) {
            console.log('Error in GET USER request');
        });
    };
    $scope.loadTweets();
}]);

twitterliteControllers.controller('MentionCtrl', ['$scope', '$http', '$routeParams', 'tweets', function ($scope, $http, $routeParams, tweets) {
    
    $scope.data = [];
    $scope.offset = 0; 
    $scope.limit = 10;

    $scope.loadTweets = function() {
        tweets.getAllMentionTweets($routeParams.mention, $scope.offset, $scope.limit).success(function( dataCallBack ) {
            $scope.data = $scope.data.concat(dataCallBack);
            $scope.offset += $scope.limit;
        }).error(function(data, status, headers, config) {
            console.log('Error in GET MENTION request');
        });
    };
    $scope.loadTweets();
}]);

twitterliteControllers.controller('HashTagCtrl', ['$scope', '$http', '$routeParams', 'tweets', function ($scope, $http, $routeParams, tweets) {
    
    $scope.data = [];
    $scope.offset = 0; 
    $scope.limit = 10; 

    $scope.loadTweets = function() {
        tweets.getAllHashtagTweets($routeParams.hashtag, $scope.offset, $scope.limit).success(function( dataCallBack ) {
            $scope.data = $scope.data.concat(dataCallBack);
            $scope.offset += $scope.limit;
        }).error(function(data, status, headers, config) {
            console.log('Error in GET HASHTAGS request');
        });
    };
    $scope.loadTweets();
}]);

