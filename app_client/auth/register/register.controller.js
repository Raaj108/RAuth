angular.module('RAuthApp')
    .controller('registerCtrl', ['$rootScope', '$location', 'authentication', function ($rootScope, $location, authentication) {

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

        vm.match = false;
        vm.confirmPassword = function () {
            if (vm.credentials.confirmPassword === vm.credentials.password) {
                vm.match = true;
            } else {
                vm.match = false;
            }
        }

        vm.checkPwdStrength = function () {
            console.log(vm.credentials.password);
        }
        
        vm.onSubmit = function () {
            authentication
                .register(vm.credentials)
                .then(function (data) {
                    vm.registration = {
                        status: data.status,
                        message: data.message
                    };
                    if (vm.registration.status === 200) {
                        $rootScope.isLoggedIn = authentication.isLoggedIn();
                        $location.path('profile');
                    }
                    vm.credentials = angular.copy(vm.reset);
                }, function (err) {
                    vm.form.$setPristine();
                    vm.registration = {
                        status: err.status,
                        message: err.message
                    };
                    vm.credentials = angular.copy(vm.reset);
                });
        };
}]);
