angular.module('popcornApp.controllers')
	.controller('MoviesController',
	function($scope, MoviesService, Favorite, UserService, $q) {
		
		$scope.$watch('chart', function(newValue) {
			if(newValue) {
				MoviesService.movies(newValue).then(function(movies) {
					$scope.movies = movies;
				});
			}
		});
    $scope.chart = "most_popular";
	});