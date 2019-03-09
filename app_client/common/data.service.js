angular.module('RAuthApp')
  .factory('meanData', ['$http', 'authentication', function ($http, authentication) {

    var services = {};
    services.getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    };

    services.uploadProfilePic = function (id) {
      var url = '/api/' + id + '/uploadProfilePic';
      return $http.put(url, "data", {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken(),
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    }

    return services;
  }]);
