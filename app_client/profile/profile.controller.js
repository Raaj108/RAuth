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
}]);
