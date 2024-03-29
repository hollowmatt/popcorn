angular.module('popcornApp.directives')
.directive('userPanel', function() {
	return {
		templateUrl: '/templates/user_panel.html',
		controller: function($scope, UserService) {
			UserService.currentUser().then(function(currentUser) {
				$scope.currentUser = currentUser;
			});
			
			$scope.$on('user:set', function(evt, currentUser) {
			 	$scope.currentUser = currentUser;
			});
			
			$scope.logout = function() {
				UserService.logout().then(function() {
					$scope.currentUser = null;
				});
			};
		}
	};
});