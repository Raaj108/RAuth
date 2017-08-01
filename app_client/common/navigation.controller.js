angular.module('RAuthApp')
  .controller('navigationCtrl', ['$location', 'authentication', function ($location, authentication) {

    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

  }]);
