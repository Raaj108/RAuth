angular.module('RAuthApp')
  .controller('fgtPwdCtrl', ['$rootScope', '$location', 'forgotPassword', function ($rootScope, $location, forgotPassword) {
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
      },
      function (err) {
        console.log(err);
      });
    };
}]);
