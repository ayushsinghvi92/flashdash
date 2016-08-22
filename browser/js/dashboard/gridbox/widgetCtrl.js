
app.controller('WidgetCtrl', ['$scope', '$controller', '$rootScope', 'WidgetSettingsFactory', 'DashboardFactory', '$interval', '$uibModal',
	function($scope, $controller, $rootScope, WidgetSettingsFactory, DashboardFactory, $interval, $uibModal) {


      $scope.remove = function(widget) {
        console.log("Cancel is returning", $interval.cancel(widget.intervalEnder), "for", widget.name || "unknown graph");
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

      $scope.updateData = function(widget){
            if (widget.intervalEnder) {
              $interval.cancel(widget.intervalEnder);
            }
            WidgetSettingsFactory.newSetKeys(widget.dataSource, widget)
            .then(function(res){
              widget.chart.data = res[0];
            });
            widget.intervalEnder = $interval(function(){
              WidgetSettingsFactory.newSetKeys(widget.dataSource, widget)
              .then(function(res){
                widget.chart.data = res[0];
              })
            }, widget.refreshInterval);
      };
  }
]);
