app.factory('SignupFactory', function($http, $state) {
    let factory = {};

    factory.signup = function(data){
    	$http.post('/api/users/signup', data)
      .then(signed => signed);
    }

return factory;
});
