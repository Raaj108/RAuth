angular.module('RAuthApp')
  .controller('registerCtrl', ['$location', 'authentication', function ($location, authentication) {

    var vm = this;

    vm.credentials = {
      name: "",
      email: "",
      password: ""
    };
    vm.reset = {};
    vm.registration = {
      status: "",
      message: ""
    };

    vm.onSubmit = function () {
      authentication
        .register(vm.credentials)
        .then(function (data) {
          vm.credentials = angular.copy(vm.reset);
          vm.registration = {
            status: data.status,
            message: data.message
          };
          if (vm.registration.status === 200) {
            $location.path('profile');
          }
        }, function (data) {
          vm.credentials = angular.copy(vm.reset);
          vm.registration = {
            status: data.status,
            message: data.message
          };
        });
    };
}]);
