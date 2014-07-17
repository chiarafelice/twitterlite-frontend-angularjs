
var twitterliteDirectives = angular.module('twitterliteDirectives', []);

twitterliteDirectives.directive('twittlink', ['$filter', '$timeout', 'linkedFilter', function ($filter, $timeout, linked) {
    'use strict';

    return {
      	restrict: 'A',
      	link: function (scope, element, attrs) {
        	var tweet = attrs.twittlink;
          element.html('<p class=\'list-group-item-text\'>' + linked(tweet) + '</h3>');
        	// $timeout(function () { element.html(linkify[type](element.html())); });
      	}
    };
}]); 




		