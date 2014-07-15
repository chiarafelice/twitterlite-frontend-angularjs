angular.module('myAppName', [])
    .controller('FirstCtrl', ['$scope','$http',function($scope,$http) {
		$http.get( "http://localhost:8080/twitterlite-ws/messages?offset=0&limit=22").success(function( dataCallBack ) {
			console.log(dataCallBack);
			 $scope.data = {messages:dataCallBack};
		 });
    }]);