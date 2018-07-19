angular.module('RAuthApp')
  .factory('forgotPassword', ['$http', '$window', 'authentication', function ($http, $window, authentication) {

    var services = {};
    
      services.forgotpassword = function (user) {
      return $http.post('/api/forgot-password', user)
      .then(function(response){
        authentication.saveToken(response.data.token);
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
