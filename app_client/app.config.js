angular.module('RAuthApp')
  .config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/forgot-password', {
        templateUrl: '/auth/forgot-password/forgot-password.view.html',
        controller: 'fgtPwdCtrl',
        controllerAs: 'vm'
      })
      .when('/forgot-password/confirmation', {
        templateUrl: '/auth/forgot-password/forgot-password-confirmation.view.html',
        controller: 'fgtPwdCtrl',
        controllerAs: 'vm'
      })
      .when('/reset-password/:token', {
        templateUrl: '/auth/forgot-password/reset-password.view.html',
        controller: 'resetPwdCtrl',
        controllerAs: 'vm'
      })
      .when('/home', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .when('/docs', {
        templateUrl: '/docs/documentation.html'        
      })
      .otherwise({
        redirectTo: '/'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }]);
