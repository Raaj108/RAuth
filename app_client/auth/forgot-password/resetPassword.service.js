angular.module('RAuthApp')
  .factory('resetPassword', ['$http', '$window', function ($http, $window) {

    var services = {};

    services.validateToken = function (token) {
      return $http.post('/api/validate-token', token)
      .then(function(response){       
         return {
              "status": response.status,
              "message": response.data.message
            };
      },
      function (response) {
         return {
          "status": response.status,
          "message": response.data.message
        };
      })
  	};    
    return services;
}]);
