angular.module('RAuthApp')
    .controller('loginCtrl', ['$location', 'authentication', function ($location, authentication) {
        var vm = this;

        vm.credentials = {
            email: "",
            password: ""
        };
        vm.reset = {};

        vm.onSubmit = function () {
            authentication
                .login(vm.credentials)
                .then(function (data) {
                    vm.credentials = angular.copy(vm.reset);
                    vm.loggingIn = {
                        status: data.status,
                        message: data.message
                    };
                    if (vm.loggingIn.status === 200) {
                        $location.path('profile');
                    } else if (vm.loggingIn.status === 401) {
                        console.log(vm.loggingIn.message);
                    }
                    /**/
                }, function (err) {
                    vm.credentials = angular.copy(vm.reset);
                    throw err;
                });
        };
}]);
