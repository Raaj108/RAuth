angular.module('RAuthApp')
  .controller('navigationCtrl', ['$location', 'authentication', function ($location, authentication) {

    var navvm = this;

    navvm.isLoggedIn = authentication.isLoggedIn();

    navvm.currentUser = authentication.currentUser();

    navvm.logout = function () {
      authentication.logout();
      navvm.isLoggedIn = false;
      $location.path('login');
    }
  }]);
