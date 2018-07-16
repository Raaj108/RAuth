angular.module('RAuthApp')
  .controller('fgtPwdCtrl', ['$rootScope', '$location', 'forgotPassword', '$window', function ($rootScope, $location, forgotPassword, $window) {
    var vm = this;

    vm.credentials = {
      email: ""      
    };
    vm.reset = {
      email: ""      
    };
    
   
    vm.onSubmit = function () {
      forgotPassword.forgotpassword(vm.credentials)
      .then(function (data) {
        console.log(data);
        $window.location.href = '/forgot-password/confirmation'
      },
      function (err) {
        vm.errorMsg = err.message;
      });
    };
}]);
