'use strict';

var twitterliteFilters = angular.module('twitterliteFilters', []);

twitterliteFilters.filter('linked', function() {
	return function(input) {
		
        input = input.replace(/(|\s)*@(\w+)/g, '$1<a href="#/mention/$2">@$2</a>');
        input = input.replace(/(^|\s)*#(\w+)/g, '$1<a href="#/hashtag/$2">#$2</a>');

        return input; 
  	};
});

