angular.module('RAuthApp')
  .controller('resetPwdCtrl', ['$rootScope', '$location', '$routeParams', '$window', 'resetPassword', function ($rootScope, $location, $routeParams, $window, resetPassword) {
    var vm = this;
    var token = $routeParams.token;
    
    resetPassword.validateToken(token)
      .then(function (response) {  
        vm.isValidToken = true;     
        console.log(response.data);        
      },
      function (err) {
        vm.isValidToken = false;
        console.log(err.data);
      });
}]);
