app.controller('userCtrl', function ($uibModal, $scope, userFactory, $state, AuthService, $mdDialog, growl) {

  AuthService.getLoggedInUser()
  .then(function(res){
    $scope.user = res;
    $scope.id = res.id
  })
  .then(function(){
    return userFactory.getAllDashboards($scope.id)
  .then(function(data){
    $scope.allDashBoards = data;
  })
  })

	$scope.update = function(id, userData){
    $scope.userEditingMode = false;
		return userFactory.updateUser(id, userData)
    .catch(function(){
      let warning = $mdDialog.confirm()
          .title('Looks like someone already has that email')
          .ariaLabel('Email Taken')
          .targetEvent(event)
          .ok('Dismiss')
          $mdDialog.show(warning);
          $scope.user.email += '(EMAIL UNAVAILABLE)';
    })
	}
	$scope.delete = function(id){
		 return userFactory.deleteUser(id);
	}
	$scope.modDashboard = function(id, content){
    $uibModal.open({
      scope: $scope,
      templateUrl: '/js/dashboard/newDashboard/newDashboard.html',
      controller: 'newDashboardCtrl',
      resolve: {
        content: function() {return content}
      }
    })
  }

  $scope.userEditingMode = false;
  $scope.dashboardEditingMode = false;

  $scope.toggleDashboardEditingMode = function(){
  	$scope.dashboardEditingMode = !$scope.dashboardEditingMode;
  }

  $scope.toggleUserEditingMode = function(){
    $scope.userEditingMode = !$scope.userEditingMode;
 }

 $scope.showConfirm = function(id, dashboardId, dashboardName) {
  var confirm = $mdDialog.confirm()
    .title('Are you sure to delete the dashboard?')
    .textContent('Dashboard ' + dashboardName + ' and all its charts will be permanently deleted.')
    .ariaLabel('Dashboard deletion')
    .targetEvent(event)
    .ok('Yes')
    .cancel('No');
  $mdDialog.show(confirm).then(function() {
    growl.success('Dashboard being deleted', {title: 'Deleted', ttl: 6000, disableCountDown: true});
    return userFactory.deleteDashboard(id, dashboardId)
    .then(function(){
      $state.reload()
    })
  }, function() {
    growl.success('You decided to keep your dashboard', {title: 'Not deleted', ttl: 4000, disableCountDown: true});
  });
};
  });
