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

    services.resetPassword = function(user){
       return $http.post('/api/reset-password', user)
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
     });
    };


    return services;
}]);
