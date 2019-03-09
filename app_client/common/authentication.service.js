angular.module('RAuthApp')
  .factory('authentication', ['$http', '$window', function ($http, $window) {

    var services = {};    

    services.saveToken = function (token) {
      $window.localStorage['RAuthApp-token'] = token;
    };

    services.getToken = function () {
      return $window.localStorage['RAuthApp-token'];
    };

    services.logout = function () {
      $window.localStorage.removeItem('RAuthApp-token');
    };

    services.isLoggedIn = function () {
      var token = services.getToken();
      var payload;
      if (token) {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    services.currentUser = function () {
      if (services.isLoggedIn()) {
        var token = services.getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email: payload.email,
          name: payload.name
        };
      }
    };

    services.register = function (user) {
      return $http.post('/api/register', user)
        .then(function (response) {
            services.saveToken(response.data.token);
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
          }
        );
    };

    services.login = function (user) {
      return $http.post('/api/login', user)
        .then(function (response) {
            services.saveToken(response.data.token);
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
          }
        );
    };
    
    return services;
}]);
