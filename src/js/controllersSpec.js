'use strict';
 
describe('Posting a tweet', function() {

    var scope; //we'll use this scope in our tests
 	var httpBackend;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('twitterApp'));



    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, $httpBackend, $http) {
        //create an empty scope
        scope = $rootScope.$new();

        //declare the controller and inject our empty scope
        $controller('TwitterCtrl', {
        	$scope: scope,
        	$http: $http
        });
        
        httpBackend = $httpBackend;

        // The method: 'scope.loadTweets();' is being called in the beforeEach - once the controller is injected (refer to controller code: init function)
        httpBackend.when('GET', 'http://localhost:8080/twitterlite-ws/messages?limit=10&offset=0').respond([]);
        httpBackend.flush();
    }));



    it('should post just one tweet', function() {
        // set the variables on the scope
    	scope.username = 'Chiara';
    	scope.tweet = 'hello from #Ixaris'.replace(/#/g,'%23');

        // keep a copy of the username & tweet, as this is then refreshed
        var tweetVar = scope.tweet;
        var usernameVar = scope.username;

        expect(scope.data.length).toBe(0); 

        httpBackend.when('POST', 'http://localhost:8080/twitterlite-ws/tweets?content=hello+from+%2523Ixaris&username=Chiara').respond({});
    	
    	scope.postTweet();
        httpBackend.flush();

    	expect(scope.data.length).toBe(1); 
    	
        // Tweet is placed at the beginning of the list
        expect(scope.data[0].username).toBe(usernameVar);
        expect(scope.data[0].content).toBe(tweetVar);        
    });



    it('should empty the username and tweet scope variables after a tweet is posted', function() {
        scope.username = 'Chiara';
        scope.tweet = 'hello from #Ixaris'.replace(/#/g,'%23');

        httpBackend.when('POST', 'http://localhost:8080/twitterlite-ws/tweets?content=hello+from+%2523Ixaris&username=Chiara').respond({});
        scope.postTweet();
        httpBackend.flush();
        
        expect(scope.username).toBe('');
        expect(scope.tweet).toBe('');     
    });



    it('after a tweet is posted, the offset should be incremented by: 1', function() {
        scope.username = 'Chiara';
        scope.tweet = 'hello from #Ixaris'.replace(/#/g,'%23');

        var offset = scope.offset; 

        httpBackend.when('POST', 'http://localhost:8080/twitterlite-ws/tweets?content=hello+from+%2523Ixaris&username=Chiara').respond({});
        scope.postTweet();
        httpBackend.flush();
        
        expect(scope.offset).toBeGreaterThan(offset);
        expect(scope.offset).toEqual(offset + 1);     
    });


});


describe('Loading tweets feed', function() {

    var scope; //we'll use this scope in our tests
    var httpBackend;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('twitterApp'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, $httpBackend, $http) {
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
        httpBackend.when('GET', 'http://localhost:8080/twitterlite-ws/messages?limit=10&offset=0').respond([{},{},{}]);
        httpBackend.flush();
        expect(scope.data.length).toBe(3);
    });    



    it('after tweets are loaded, the offset value should change', function() {
        // keep a copy of these values
        var offset = scope.offset;
        var limit = scope.limit; 

        // The method: 'scope.loadTweets();' is being called in the beforeEach - once the controller is injected (refer to controller code: init function)
        httpBackend.when('GET', 'http://localhost:8080/twitterlite-ws/messages?limit=10&offset=0').respond([{},{},{}]);
        httpBackend.flush();

        expect(scope.offset).toBeGreaterThan(offset);
        expect(scope.offset).toEqual(offset + limit);
    });



    it('should map the index route to the TwitterCtrl and corresponding template', function() {
        inject(function($route) {
            expect($route.routes['/index'].controller).toBe('TwitterCtrl');
            expect($route.routes['/index'].templateUrl).toEqual('tpl/frontpage.html');
        });
    });


    it('should map any route which does not have a corresponding mapping to /index', function() {
        inject(function($route) {
            expect($route.routes[null].redirectTo).toEqual('/index');
        });
    });


});



describe('Loading tweets of one user', function() {

    var scope;//we'll use this scope in our tests
    var httpBackend;
    var routeParams;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('twitterApp'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $routeParams, $controller, $httpBackend, $http){
        //create an empty scope
        scope = $rootScope.$new();
        routeParams = {
            user: 'Chiara'
        };

        //declare the controller and inject our empty scope
        $controller('UserCtrl', {
            $scope: scope,
            $routeParams: routeParams,
            $http: $http
        });
        
        httpBackend = $httpBackend;
    }));



    it('should load three tweets from a user', function() {
        httpBackend.when('GET', 'http://localhost:8080/twitterlite-ws/messages/user?limit=10&offset=0&user=Chiara').respond([{}, {}, {}]);
        httpBackend.flush();
        expect(scope.data.length).toBe(3);
    });   



    it('after tweets are loaded, the offset value should change', function() {
        // keep a copy of these values
        var offset = scope.offset;
        var limit = scope.limit; 

        // The method: 'scope.loadTweets();' is being called in the beforeEach - once the controller is injected (refer to controller code: init function)
        httpBackend.when('GET', 'http://localhost:8080/twitterlite-ws/messages/user?limit=10&offset=0&user=Chiara').respond([{}, {}, {}]);
        httpBackend.flush();

        expect(scope.offset).toBeGreaterThan(offset);
        expect(scope.offset).toEqual(offset + limit);
    });


    it('should map the /user/:user route to the UserCtrl and corresponding template', function() {
        inject(function($route) {
            expect($route.routes['/user/:user'].controller).toEqual('UserCtrl');
            expect($route.routes['/user/:user'].templateUrl).toEqual('tpl/content.html');
        });
    });
});   



describe('Loading tweets which mention a user', function() {

    var scope;//we'll use this scope in our tests
    var httpBackend;
    var routeParams;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('twitterApp'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $routeParams, $controller, $httpBackend, $http){
        //create an empty scope
        scope = $rootScope.$new();
        routeParams = {
            mention: 'Chiara'
        };

        //declare the controller and inject our empty scope
        $controller('MentionCtrl', {
            $scope: scope,
            $routeParams: routeParams,
            $http: $http
        });
        
        httpBackend = $httpBackend;
    }));



    it('should load three tweets from a user', function() {
        httpBackend.when('GET', 'http://localhost:8080/twitterlite-ws/messages/mention?limit=10&mention=Chiara&offset=0').respond([{}, {}, {}]);
        httpBackend.flush();
        expect(scope.data.length).toBe(3);
    });   



    it('after tweets are loaded, the offset value should change', function() {
        // keep a copy of these values
        var offset = scope.offset;
        var limit = scope.limit; 

        // The method: 'scope.loadTweets();' is being called in the beforeEach - once the controller is injected (refer to controller code: init function)
        httpBackend.when('GET', 'http://localhost:8080/twitterlite-ws/messages/mention?limit=10&mention=Chiara&offset=0').respond([{}, {}, {}]);
        httpBackend.flush();

        expect(scope.offset).toBeGreaterThan(offset);
        expect(scope.offset).toEqual(offset + limit);
    });



    it('should map the index route to the MentionCtrl and corresponding template', function() {
        inject(function($route) {
            expect($route.routes['/mention/:mention'].controller).toEqual('MentionCtrl');
            expect($route.routes['/mention/:mention'].templateUrl).toEqual('tpl/content.html');
        });
    });
});   



describe('Loading tweets which contain a specified hashtag', function() {

    var scope;//we'll use this scope in our tests
    var httpBackend;
    var routeParams;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('twitterApp'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $routeParams, $controller, $httpBackend, $http){
        //create an empty scope
        scope = $rootScope.$new();
        routeParams = {
            hashtag: 'Chiara'
        };

        //declare the controller and inject our empty scope
        $controller('HashTagCtrl', {
            $scope: scope,
            $routeParams: routeParams,
            $http: $http
        });
        
        httpBackend = $httpBackend;

    }));



    it('should load three tweets which contain the specified hashtag', function() {
        httpBackend.when('GET', 'http://localhost:8080/twitterlite-ws/messages/hashtags?hashtags=Chiara&limit=10&offset=0').respond([{}, {}, {}]);
        httpBackend.flush();
        expect(scope.data.length).toBe(3);
    });  



    it('after tweets are loaded, the offset value should change', function() {
        // keep a copy of these values
        var offset = scope.offset;
        var limit = scope.limit; 

        // The method: 'scope.loadTweets();' is being called in the beforeEach - once the controller is injected (refer to controller code: init function)
        httpBackend.when('GET', 'http://localhost:8080/twitterlite-ws/messages/hashtags?hashtags=Chiara&limit=10&offset=0').respond([{}, {}, {}]);
        httpBackend.flush();

        expect(scope.offset).toBeGreaterThan(offset);
        expect(scope.offset).toEqual(offset + limit);
    });


    it('should map the index route to the HashTagCtrl and corresponding template', function() {
        inject(function($route) {
            expect($route.routes['/hashtag/:hashtag'].controller).toEqual('HashTagCtrl');
            expect($route.routes['/hashtag/:hashtag'].templateUrl).toEqual('tpl/content.html');
        });
    });
});



describe('filter', function () {
    beforeEach(module('twitterApp'));

    it('should add no anchor tag', inject(function (linkedFilter) {
        var tweet = "Hello no hashtag";
        expect(linkedFilter(tweet)).toEqual(tweet);
    }));

    it('should add an anchor tag around words which are hashtagged: one tag', inject(function (linkedFilter) {
        var tweet = "Hello #ixaris";
        expect(linkedFilter(tweet)).toEqual('Hello <a href="#/hashtag/ixaris">#ixaris</a>');
    }));

    it('should add an anchor tag around words which are hashtagged: >1 tag', inject(function (linkedFilter) {
        var tweet = "Hello #ixaris in #san #gwann";
        expect(linkedFilter(tweet)).toEqual('Hello <a href="#/hashtag/ixaris">#ixaris</a> in <a href="#/hashtag/san">#san</a> <a href="#/hashtag/gwann">#gwann</a>');
    }));

    it('should add an anchor tag around mentioned users', inject(function (linkedFilter) {
        var tweet = "Hello @chiara";
        expect(linkedFilter(tweet)).toEqual('Hello <a href="#/mention/chiara">@chiara</a>');
    }));

    it('should add an anchor tag around mentioned users: >1 mention', inject(function (linkedFilter) {
        var tweet = "Hello @chiara and @thomas";
        expect(linkedFilter(tweet)).toEqual('Hello <a href="#/mention/chiara">@chiara</a> and <a href="#/mention/thomas">@thomas</a>');
    }));

    it('should add anchor tags around # and @', inject(function (linkedFilter) {
        var tweet = "Hello it is @chiara working without @thom as he is in #rome eating #icecream";
        expect(linkedFilter(tweet)).toEqual('Hello it is <a href="#/mention/chiara">@chiara</a> working without <a href="#/mention/thom">@thom</a> as he is in <a href="#/hashtag/rome">#rome</a> eating <a href="#/hashtag/icecream">#icecream</a>');
    }));

});


