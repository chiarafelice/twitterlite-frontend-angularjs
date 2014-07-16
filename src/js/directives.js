'use strict';

var twitterliteDirectives = angular.module('twitterliteDirectives', []);

twitterliteDirectives.directive('superman', function() {
	return {
		restrict: 'E',
		template: '<div>Hello</div>'
	}
});

twitterliteDirectives.directive('twittlink', ['$filter', '$timeout', 'linkedFilter', function ($filter, $timeout, linked) {
    'use strict';

    return {
      	restrict: 'A',
      	link: function (scope, element, attrs) {
        	var tweet = attrs.twittlink;

        	// element.html("<p class='lead'>" + tweet + "</h3>");

			element.html("<p class='list-group-item-text'>" + linked(tweet) + "</h3>");

	      	// element.html(reverse(element.html));
        	// console.log(twitlink(tweet));

        	// $timeout(function () { element.html(linkify[type](element.html())); });
      	}
    };
}]); 




		