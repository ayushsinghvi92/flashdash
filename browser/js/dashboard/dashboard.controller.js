
app.controller('dashboardCtrl', ['$stateParams', '$scope', 'DashboardFactory', '$rootScope', 'dashList', '$interval', 'WidgetSettingsFactory',
    function($stateParams, $scope, DashboardFactory, $rootScope, dashList, $interval, WidgetSettingsFactory) {

    $scope.editable = false;
    $scope.dashName = $stateParams.name || "You have no dashboards";
    $scope.dashDesc = $stateParams.description || "Please create a dashboard";
    $scope.dashboard = null;

    $scope.update = function() {
        if ($scope.selectedDb) {
            $scope.dashName = $scope.selectedDb.name;
            $scope.dashDesc = $scope.selectedDb.description;
            $scope.editable = false;

            DashboardFactory.getDashboard($scope.selectedDb.id)
            .then(db => {
                $scope.dashboard = db;
                $scope.$applyAsync();
            })
        }
    };



    // The resolve fetched a list of dashboards for this user.  Note that this
    // does not entail the graphs, which must be fetched later.
    $scope.dashboardList = dashList;
    if (dashList.length > 0){
        let indexOfDashToLoad = 0;
        if($stateParams.dashToLoad){
            indexOfDashToLoad = DashboardFactory.findIndexToLoad(dashList, $stateParams.dashToLoad.name)
        }
        $scope.selectedDb = dashList[indexOfDashToLoad];
    }
    $scope.update();


}]);
