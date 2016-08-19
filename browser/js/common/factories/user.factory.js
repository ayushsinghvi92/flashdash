'use strict'

app.factory('userFactory', function($http, AuthService, growl){
	var obj = {};

	obj.updateUser = function(id, data){
		return $http.put('/api/users/' + id, data)
			.then(res => res.data)
	}

	obj.deleteUser = function(id){
    AuthService.logout();
		return $http.delete('/api/users/' + id)
		.then(function(res){
      return res.data;
    })
	}

	obj.addDashboard = function(id, content){
    	return $http.post('api/users/' + id + '/dashboard', content)
    	.then(res => res.data)
      .catch(function(err) {
        if (err.status) {
          growl.error(err.data, {title: err.statusText || '', ttl: 4000, disableCountDown: true});
        }
        throw (err);
      })
  	}

	obj.updateDashboard = function(id, dashId, content){
  		return $http.put('api/users/' + id + '/dashboard/' + dashId, content)
  		.then(res =>res.data)
  	}

	obj.deleteDashboard = function(id, dashId){
    	return $http.delete('api/users/' + id + '/dashboard/' + dashId)
  	}

  	obj.getAllDashboards = function(){
  		return AuthService.getLoggedInUser()
  		.then(function (user) {
  			return $http.get('api/users/' + user.id + '/dashboards')
  		})
    	.then(res => res.data);
  	}

	return obj
})
