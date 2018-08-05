angular.module('RAuthApp')
  .factory('forgotPassword', ['$http', '$window', function ($http, $window) {

    var services = {};
    
      services.forgotpassword = function (user) {
      return $http.post('/api/forgot-password', user)
      .then(function(response){       
        return {
          "status": response.status,
          "message": response.data.message
        }
      },
      function (response) {        
        return {
         "status": response.status,
         "message": response.data.message
        }        
     });
    };
    return services;
}]);
