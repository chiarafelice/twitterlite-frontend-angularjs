'use strict';
 
describe('TwitterCtrl', function(){
    var scope;//we'll use this scope in our tests
 	var httpBackend;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('twitterApp'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, $httpBackend, $http){
        //create an empty scope
        scope = $rootScope.$new();

        //declare the controller and inject our empty scope
        $controller('TwitterCtrl', {
        	$scope: scope,
        	$http: $http
        });
        
        httpBackend = $httpBackend;

    }));

    it('should load three tweets', function() {

        // The method: 'scope.loadTweets();' is being called in the beforeEach - once the controller is injected (refer to controller code: init function)

        httpBackend.flush();
        expect(scope.data.length).toBe(3);
    });    

    it('should post one tweet', function() {

    	scope.username = 'Chiara';
    	scope.tweet = 'hello from Ixaris'.replace(/#/g,'%23');

       	expect(scope.data.length).toBe(0);

        httpBackend.when('GET', 'http://localhost:8080/twitterlite-ws/messages?limit=10&offset=0').respond([{}, {}, {}]);
        httpBackend.when('POST', 'http://localhost:8080/twitterlite-ws/tweets?content=hello+from+Ixaris&username=Chiara').respond({});
    	
    	scope.postTweet();
        httpBackend.flush();

    	expect(scope.data.length).toBe(4);

    })

});

