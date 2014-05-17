angular.module('popcornApp.services')
	.service('UserService',
		function($q, $cookieStore, $rootScope) {
			//login
			//logout
			//current_user

			this._user = null;
			var service = this;

			this.setCurrentUser = function(u) {
				service._user = u;
				$cookieStore.put('user', u);
				$rootScope.$broadcast("user:set", u);
			};

			this.login = function(email) {
				var d = $q.defer();
				var user = {
					email: email,
					id: 1
				};
				service.setCurrentUser(user);
				d.resolve(user);
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