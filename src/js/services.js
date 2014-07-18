'use strict';

var twitterliteServices = angular.module('twitterliteServices', []);

twitterliteServices.service('tweets', function($http) {
    
    function getAllTweets(offset, limit) {
        return $http({
            url: 'http://localhost:8080/twitterlite-ws/messages', 
            method: 'GET',
            params: {
                offset : offset || 0,
                limit : limit || 10
            }
        });
    } 

    function postTweet (username, content) {
        return $http({
            url: 'http://localhost:8080/twitterlite-ws/tweets', 
            method: 'POST',
            params: {
                username : username,
                content : content
            }
        });
    } 

    function getAllUserTweets(username, offset, limit) {
        return $http({
            url: 'http://localhost:8080/twitterlite-ws/messages/user', 
            method: 'GET',
            params: {
                user : username,
                offset: offset,
                limit : limit
            }
         });
    }

    function getAllMentionTweets(mention, offset, limit) {
        return $http({
            url: 'http://localhost:8080/twitterlite-ws/messages/mention', 
            method: 'GET',
            params: {
                mention : mention,
                offset : offset,
                limit : limit
            }
         })
    }

    function getAllHashtagTweets(hashtag, offset, limit) {
        return $http({
            url: 'http://localhost:8080/twitterlite-ws/messages/hashtags', 
            method: 'GET',
            params: {
                hashtags : hashtag,
                offset : offset,
                limit : limit
            }
         })
    }

    return {
        postTweet : postTweet,
        getAllTweets : getAllTweets,
        getAllUserTweets : getAllUserTweets,
        getAllMentionTweets : getAllMentionTweets, 
        getAllHashtagTweets : getAllHashtagTweets
    };

});