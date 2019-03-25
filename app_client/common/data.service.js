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

        services.uploadProfilePic = function (id, rawData) {
            var url = '/api/' + id + '/uploadProfilePic';   
            console.log(rawData)
            return $http.post(url, rawData, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    enctype:"multipart/form-data"
                }
            });
        }

        return services;
  }]);
