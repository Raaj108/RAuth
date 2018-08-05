angular.module('RAuthApp')
  .controller('fgtPwdCtrl', ['$rootScope', '$location', 'forgotPassword', '$window', function ($rootScope, $location, forgotPassword, $window) {
    var vm = this;

    vm.credentials = {
      email: ""      
    };
    vm.reset = {
      email: ""      
    };

    vm.sendEmail = {
      status: "",
      message: ""
    }

    vm.isEmailSent = false;     
       
    vm.onSubmit = function () {
      forgotPassword.forgotpassword(vm.credentials)
      .then(function (data) {  
        vm.sendEmail = {
          status: data.status,
          message: data.message
        }
        if(vm.sendEmail.status === 200){
          vm.isEmailSent = true;         
        } 
         vm.credentials = angular.copy(vm.reset);       
      },function (err) { 
        vm.form.$setPristine();        
        vm.sendEmail = {
          status: err.status,
          message: err.message
         };
        vm.credentials = angular.copy(vm.reset);          
      });
    };

    vm.resendLink = function(){
      vm.form.$setPristine(); 
      vm.isEmailSent = false;
    }
}]);
