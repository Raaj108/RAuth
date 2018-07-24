angular.module('RAuthApp')
  .factory('resetPassword', ['$http', '$window', function ($http, $window) {

    var services = {};

    services.validateToken = function (token) {
      return $http.get('/api/validate-token', {
        headers:{
           Authorization: token
        }
      })      
  	};    
    return services;
}]);
