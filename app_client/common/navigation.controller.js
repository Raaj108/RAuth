angular.module('RAuthApp')
  .controller('navigationCtrl', ['$rootScope','$location', 'authentication', function ($rootScope, $location, authentication) {

    var navvm = this;
   
    navvm.currentUser = authentication.currentUser();

    navvm.logout = function () {
      authentication.logout();
      $rootScope.isLoggedIn = authentication.isLoggedIn();        
      $location.path('login');
    }

    navvm.showUserMenu = function(){
    	document.getElementById('userMenu').style.display = 'block';
    }

    navvm.hideUserMenu = function(){
    	document.getElementById('userMenu').style.display = 'none';
    }
  }]);
