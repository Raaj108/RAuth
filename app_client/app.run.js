angular.module('RAuthApp')
  .run(['$rootScope', '$location', 'authentication', function ($rootScope, $location, authentication) {

    $rootScope
      .$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
        console.log(authentication.isLoggedIn())
        if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
          $location.path('/');
        }
      });
}]);
