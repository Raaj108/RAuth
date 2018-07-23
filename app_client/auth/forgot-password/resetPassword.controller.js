angular.module('RAuthApp')
  .controller('resetPwdCtrl', ['$rootScope', '$location', '$routeParams', '$window', 'resetPassword', function ($rootScope, $location, $routeParams, $window, resetPassword) {
    var vm = this;
    var token = $routeParams.token;

    console.log(token);
    resetPassword.validateToken(token)
      .then(function (data) {
        console.log(data);
        
      },
      function (err) {
        console.log(data);
      });
}]);
