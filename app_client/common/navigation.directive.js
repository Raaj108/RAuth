angular.module('RAuthApp')
  .directive('navigation', function () {
    return {
      restrict: 'EA',
      templateUrl: '/common/navigation.view.html',
      controller: 'navigationCtrl',
      controllerAs: 'navvm',
      replace: true
    }
  });
