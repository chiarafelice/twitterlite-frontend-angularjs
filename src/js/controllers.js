'use strict';

var twitterliteControllers = angular.module('twitterliteControllers', []);

twitterliteControllers.controller('TwitterCtrl', ['$scope', '$http', function ($scope ,$http) {
  	
	$scope.data = [];

  	$http.get( 'http://localhost:8080/twitterlite-ws/messages?offset=0&limit=22').success(function( dataCallBack ) {
		console.log(dataCallBack);
		$scope.data = {messages:dataCallBack};

		// var tagslistarr = $scope.data[i].content.split(' ');
		// var arr=[];

		// $scope.tweet = '';

		// for(var i = 0; i < tagslistarr.length; i++) {
		//     if(tagslistarr[i].indexOf('#') == 0){
		//     	var tag = tagslistarr[i].substring(1);
		//     	var url = "content.html?hashtag=%22"+tag+"%22";
		    	
		//     	$scope.tweet += "<a href=" + url + ">" + tagslistarr[i] + " </a>";
		        
		//     } else if(tagslistarr[i].indexOf('@') == 0){
		//     	var user = tagslistarr[i].substring(1);

		//     	var url = "content.html?user=%22"+user+"%22";
		//     	$scope.tweet += "<a href=" + url + ">" + tagslistarr[i] + " </a>";

		//     } else {
		//     	$scope.tweet += tagslistarr[i] + " ";
		//     }
		// }
	});




}]);

		// var tagslistarr = $scope.data[i].content.split(' ');
		// var arr=[];

		// $scope.tweet = '';

		// for(var i = 0; i < tagslistarr.length; i++) {
		//     if(tagslistarr[i].indexOf('#') == 0){
		//     	var tag = tagslistarr[i].substring(1);
		//     	var url = "content.html?hashtag=%22"+tag+"%22";
		    	
		//     	$scope.tweet += "<a href=" + url + ">" + tagslistarr[i] + " </a>";
		        
		//     } else if(tagslistarr[i].indexOf('@') == 0){
		//     	var user = tagslistarr[i].substring(1);

		//     	var url = "content.html?user=%22"+user+"%22";
		//     	$scope.tweet += "<a href=" + url + ">" + tagslistarr[i] + " </a>";

		//     } else {
		//     	$scope.tweet += tagslistarr[i] + " ";
		//     }
		// }