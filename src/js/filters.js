'use strict';

var twitterliteFilters = angular.module('twitterliteFilters', []);

twitterliteFilters.filter('linked', function() {
	return function(input) {

        input = input.replace(/(|\s)*@(\w+)/g, '$1<a href="#/user/$2">@$2</a>');
        input = input.replace(/(^|\s)*#(\w+)/g, '$1<a href="#/hashtag/$2">#$2</a>');

        // input = input.replace(/#(\S+)/g, '<a href="#hashtag/$1">#$1</a>');
        // input = input.replace(/@(\S+)/g, '<a href="#user/$1">@$1</a>');


        return input; 
  	};
});

