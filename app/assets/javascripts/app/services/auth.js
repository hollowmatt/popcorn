angular.module('popcornApp.services')
	.service('AuthService', 
 function($rootScope, $q, $cookieStore) {
   var service = this;
   this._user = null;
   this.setCurrentUser = function(u) {
     service._user = u;
     $cookieStore.put('user', u);
     $rootScope.$broadcast("user:set", u);
   };
   this.removeCurrentUser = function() {
     service._user = null;
     $cookieStore.remove('user');
     $rootScope.$broadcast("user:unset");
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