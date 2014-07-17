'use strict';
 
describe('TwitterCtrl', function(){
    var scope;//we'll use this scope in our tests
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('twitterApp'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, $httpBackend){
        //create an empty scope
        scope = $rootScope.$new();

        //declare the controller and inject our empty scope
        $controller('TwitterCtrl', {$scope: scope});
    }));

    // tests start here
    it('should have variable text = Hello', function(){
        expect(scope.test).toBe('Hello');
    });
});