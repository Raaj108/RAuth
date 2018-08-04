angular.module('RAuthApp')
  .controller('resetPwdCtrl', ['$rootScope', '$location', '$routeParams', '$window', 'resetPassword', function ($rootScope, $location, $routeParams, $window, resetPassword) {
    var vm = this;
    var token = $routeParams.token;

    vm.credentials = {
      password: "",
      token:token   
    };

    vm.reset = false;
    
    resetPassword.validateToken(token)
      .then(function (response) {  
        vm.isValidToken = true;        
      },
      function (err) {
        vm.isValidToken = false;
        console.log(err.data);
      });

      vm.onSubmit = function () {
        resetPassword.resetPassword(vm.credentials).then(function (data) {
          if(data.status === 200){
              vm.reset = true;
          }        
        },
        function (err) {
          vm.errorMsg = err.message;
        });
      }
}]);
