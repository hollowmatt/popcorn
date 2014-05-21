angular.module('popcornApp.controllers')
	.controller('MoviesController',
	function($scope, MoviesService, Favorite, UserService, $q) {
		console.log("MoviesController is booting");
	
    MoviesService.movies().then(function(movies) {
      $scope.movies = movies;
    });
	});