angular.module('RAuthApp')
  .controller('fgtPwdCtrl', ['$rootScope', '$location', 'forgotPassword', '$window', function ($rootScope, $location, forgotPassword, $window) {
    var vm = this;

    vm.credentials = {
      email: ""      
    };
    vm.reset = {
      email: ""      
    };

     vm.isEmailSent = false;
       
    vm.onSubmit = function () {
      forgotPassword.forgotpassword(vm.credentials)
      .then(function (data) {        
       if(data.status === 200){
          vm.isEmailSent = true;
       }
      },
      function (err) {
        vm.errorMsg = err.message;
      });
    };

    vm.resendLink = function(){
      vm.isEmailSent = false;
    }
}]);
