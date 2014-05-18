angular.module('popcornApp.resources', ['rails'])
.factory("Movie",
	function(railsResourceFactory) {
		return railsResourceFactory({
			url: '/movies',
			name: 'movie'
		});
	});