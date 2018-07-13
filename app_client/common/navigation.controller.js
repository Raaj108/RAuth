angular.module('RAuthApp')
  .controller('navigationCtrl', ['$rootScope','$location', 'authentication', function ($rootScope, $location, authentication) {

    var navvm = this;
   
    navvm.currentUser = authentication.currentUser();

    navvm.logout = function () {
      authentication.logout();
      $rootScope.isLoggedIn = authentication.isLoggedIn();        
      $location.path('login');
    }
  }]);
