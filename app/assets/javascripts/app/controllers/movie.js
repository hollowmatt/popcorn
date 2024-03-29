angular.module('popcornApp.controllers')
	.controller('MovieController', 
		function($scope, MoviesService, $routeParams, $sce, Movie) {
			console.log('MovieController is booting');
			Movie.query({youtube_id: $routeParams.movie_id}).then(function(movies) {
				if(movies.length > 0) {
					var movie = movies[0];
					movie.youtubeUrl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + movie.youtubeId + "?rel=0");
					$scope.movie = movie;
				}
			});
	});