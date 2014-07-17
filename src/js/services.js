// 'use strict';

// var twitterliteServices = angular.module('twitterliteServices', []);

// twitterliteServices.factory('TwitterService', function() {
// 	return {
// 		prepareTweets: function(dataCallBack){
// 			var tweetData = [];

// 	        for (var j = 0; j < dataCallBack.length; j++) {     

// 		        var tagslistarr = dataCallBack[j].content.split(' ');
// 		        var arr=[];
// 		        var url = '';
// 		        var tweet = '';

// 		        for(var i = 0; i < tagslistarr.length; i++) {
// 		            if(tagslistarr[i].indexOf('#') === 0){
// 		              var tag = tagslistarr[i].substring(1);
// 		              url = '#hashtag/' + tag ;
// 		              tweet += '<a href=' + url + '> ' + tagslistarr[i] + ' </a>';         
// 		            } else if(tagslistarr[i].indexOf('@') === 0){
// 		              var user = tagslistarr[i].substring(1);
// 		              url = '#user/' +user ;
// 		              tweet += '<a href=' + url + '> ' + tagslistarr[i] + ' </a>';         
// 		            } else {
// 		              tweet += tagslistarr[i] + ' ';
// 		            }
// 		        }

// 		        var tweetDate = dataCallBack[j].date;

// 		        if(tweetDate == null) {
// 		        	tweetDate = new Date().getTime() / 1000;
// 		        }

// 		        tweetData[j] = {
// 		              username: dataCallBack[j].username,
// 		              content: tweet, 
// 		              date: moment.unix(tweetDate).format('MMMM Do YYYY, h:mm a')
// 		        };
// 	      	}            
//     		return tweetData;
//         }  
//     }; 
// });