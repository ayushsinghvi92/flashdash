
app.controller('WidgetCtrl', ['$scope', '$controller', '$rootScope', 'WidgetSettingsFactory', 'DashboardFactory', '$interval', '$uibModal',
	function($scope, $controller, $rootScope, WidgetSettingsFactory, DashboardFactory, $interval, $uibModal) {

    $scope.$on('$destroy', function() {
      console.log("Help!  My scope is being destroyed!  I am", $scope.widget.name)
    })

      $scope.remove = function(widget) {
        WidgetSettingsFactory.stopTicking(widget);
        $scope.dashboard.charts.splice($scope.dashboard.charts.indexOf(widget), 1);
      };

      $scope.openSettings = function(widget) {
        $uibModal.open({
          scope: $scope,
          templateUrl: '/js/dashboard/gridbox/widgetSettings.html',
          controller: 'WidgetSettingsCtrl',
          resolve: {
            widget: function() {
              return widget;
            }
          }
        })
      };

      $scope.widgetReady = function(chart) {
        WidgetSettingsFactory.startTicking(chart);
      }

      $scope.updateData = function(widget){
       WidgetSettingsFactory.startTicking(widget);
     };
   }
   ]);
