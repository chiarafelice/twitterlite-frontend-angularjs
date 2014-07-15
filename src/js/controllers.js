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


twitterliteControllers.controller('UserCtrl', ['$scope', '$http', '$routeParams',
function ($scope ,$http,$routeParams) {
  	
  	$http.get( 'http://localhost:8080/twitterlite-ws/messages/user?user='+$routeParams.user+'&offset=0&limit=10').success(function( dataCallBack ) {
		console.log(dataCallBack);
		 $scope.data = {messages:dataCallBack};
	 });

  //  console.log($routeParams.user);

}]);

twitterliteControllers.controller('HashTagCtrl', ['$scope', '$http', '$routeParams',
function ($scope ,$http,$routeParams) {
  	
  	$http.get( 'http://localhost:8080/twitterlite-ws/messages/hashtags?hashtags='+$routeParams.hashtag+'&offset=0&limit=10').success(function( dataCallBack ) {
		console.log(dataCallBack);
		 $scope.data = {messages:dataCallBack};
	 });

   // console.log($routeParams.hashtag);

}]);


>>>>>>> 56703b735e98b0dd9a1bf8aa3e14ce81f1442202
