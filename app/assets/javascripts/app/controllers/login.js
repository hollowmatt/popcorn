angular.module('popcornApp.controllers')
.controller('LoginController',
	function($scope, $location, UserService) {
		$scope.signup = {};
		$scope.login = {};

		UserService.currentUser().then(function(user) {
			$scope.user = user;
		});

		$scope.submitSignup = function() {
			UserService.signup($scope.signup).then(function(user) {
				console.log(user);
				//$scope.user = user;
				$location.path("/");
			},
			function(reason) {
				$scope.signup.errors = reason;
			});
		};

		$scope.submitLogin = function() {
			UserService.login($scope.login.email).then(function(user) {
				console.log(user);
				$scope.user = user;
				$location.path("/");
			});
		};
	})