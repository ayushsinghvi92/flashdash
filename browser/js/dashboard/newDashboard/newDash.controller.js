app.controller('newDashboardCtrl', function (userFactory,$state,$uibModalInstance, $scope) {
	
	// $scope.form = {
	// 	name: dashbaord.name, 
	// 	description: dashboard.description
	// }

	$scope.submit = function () {
	 	// angular.extend(dashboard, $scope.form)
		return userFactory.addDashboard($scope.id, $scope.form)
	    .then(function(){
	    	$state.go('dashboard', {dashToLoad: $scope.form})
	    })
	}
	$scope.dismiss = function() {
        $uibModalInstance.dismiss();
      };
});