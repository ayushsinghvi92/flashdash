app.controller('signupCtrl', function($scope, SignupFactory, AuthService, $state){



	$scope.submit = function(signup){
		$scope.personInfo = {
		 email: signup.email,
		 password: signup.password,
		 firstName: signup.firstName,
		  lastName: signup.lastName
		}
    SignupFactory.signup($scope.personInfo);
    AuthService.login({email : $scope.personInfo.email, password : $scope.personInfo.password})
    .then(function(){
      $state.go('dashboard');
    })
    .catch(function(){
      $scope.error = 'Email already registered';
    })
	}
})
