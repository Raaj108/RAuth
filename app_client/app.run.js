angular.module('RAuthApp')
    .run(['$rootScope', '$location', 'authentication', function ($rootScope, $location, authentication) {

        $rootScope
            .$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
                if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
                    $location.path('/');
                }else if ($location.path() === '/home' && !authentication.isLoggedIn()) {
                    $location.path('/');
                }
            });
          
            $rootScope.isLoggedIn = authentication.isLoggedIn();
}]);
