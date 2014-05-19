angular.module('popcornApp.controllers')
	.controller('MoviesController',
	function($scope, MoviesService, Favorite, UserService) {
		console.log("MoviesController is booting");
	
    MoviesService.movies().then(function(movies) {
       $scope.movies = movies;  
    })
   	$scope.addFavorite = function(movie) {
   		UserService.currentUser().then(function(user) {
        Favorite.createForUserAndMovie(user, movie).then(function() {
          movie.isFavorite = true;
        });
      });
    };

   	$scope.removeFavorite = function(movie) {
   		UserService.currentUser().then(function(user) {
        Favorite.removeFavorite(user, movie).then(function(){
          movie.isFavorite = false;
        });
      });
   	};
	});