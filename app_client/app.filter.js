angular.module('RAuthApp')
  .filter('filterNameAndEmail', function(){
    return function(input){
      var result = {};
      angular.forEach(input, function(value, key) {
        if(key === 'name' || key === 'email'){
          result[key] = value;
        }
      });   
      return result;   
    }
  })
  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});