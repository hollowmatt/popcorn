angular.module('popcornApp.services')
	.service('UserService',
		function($q, $cookieStore, $rootScope, $http) {
			//login
			//logout
			//current_user

			this._user = null;
			var service = this;

			this.setCurrentUser = function(user) {
				service._user = user;
				$cookieStore.put('user', user);
				$rootScope.$broadcast("user:set", user);
			};

			this.signup = function(params) {
				var d = $q.defer();
				$http({
					url: '/users',
					method: 'POST',
					data: {
						user: params
					}
				}).success(function(response) {
					var user = response.data.user;
					user.auth_token = response.data.auth_token;

					service.setCurrentUser(user);

					d.resolve(user);
				}).error(function(reason) {
					d.reject(reason);
				});

				return d.promise;
			}; 

			this.setCurrentUser = function(u) {
				service._user = u;
				$cookieStore.put('user', u);
				$rootScope.$broadcast("user:set", u);
			};

			this.login = function(params) {
				var d = $q.defer();
				$http({
					url: '/users/sign_in',
					method: 'POST',
					data: {
						user: params
					}
				}).success(function(response) {
					console.log(response);
					if(response.success) {
						var user = response.data.user;
						user.auth_token = response.data.auth_token;
						service.setCurrentUser(user);
						d.resolve(user);
					} else {
						d.reject(response);
					}
				}).error(function(reason){
					d.reject(reason);
				});
				return d.promise;
			};

			this.logout = function() {
				var d = $q.defer();
				service._user = null;
				//might need to call database or something
				$cookieStore.remove('user');
				$rootScope.$broadcast("user:unset")
				d.resolve();
				return d.promise;
			};

			this.currentUser = function() {
				var d = $q.defer();
				if(service._user) {
					d.resolve(service._user);
				} else if($cookieStore.get('user')) {
					service.setCurrentUser($cookieStore.get('user'));
					d.resolve(service._user);
				} else {
					d.resolve(null);
				}
				return d.promise;
			};

		});