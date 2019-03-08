angular.module('RAuthApp')
    .controller('profileCtrl', ['$location', 'meanData', function ($location, meanData) {
        var vm = this;
        vm.user = {};

        meanData.getProfile()
            .then(function (data) {
                vm.user = data.data;
            }, function (data) {
                console.log(data);
            });


        vm.edit = function (field) {
            if (field === 'name') {
                vm.editName = true;
                vm.editEmail = false;
            } else {
                vm.editName = false;
                vm.editEmail = true;
            }

        }
}]);
