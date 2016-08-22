app.controller('WidgetSettingsCtrl', ['$scope', '$timeout','DashboardFactory', '$rootScope', '$uibModalInstance', 'widget', 'GeneratorFactory', '$interval', 'WidgetSettingsFactory',
    function($scope, $timeout, DashboardFactory, $rootScope, $uibModalInstance, widget, GeneratorFactory, $interval, WidgetSettingsFactory) {

      $scope.widget = widget;
      if(widget.chart.data && widget.chart.data[0].values.length){
        $scope.dataKeys = Object.keys(widget.chart.data[0].values[0]);
      }

      $scope.widgetTypes = Object.keys(GeneratorFactory);

      $scope.form = {
        name: widget.name,
        sizeX: widget.sizeX,
        sizeY: widget.sizeY,
        col: widget.col,
        row: widget.row,
        type: widget.type,
        dataSource: widget.dataSource,
        yparam: widget.yparam,
        xparam: widget.xparam,
        refreshInterval : widget.refreshInterval || 10000000,
      };
     $scope.setKeys = function(){
        return WidgetSettingsFactory.newSetKeys($scope.form.dataSource, $scope.widget)
        .then(function(res){
          widget.chart.data = res[0];
          $scope.dataKeys = res[1];
        })
      }

      $scope.dismiss = function() {
        $uibModalInstance.dismiss();
      };

      $scope.remove = function() {
        $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
        $uibModalInstance.close();
      };

      $scope.submit = function() {
        angular.extend(widget, $scope.form);
        //update with new options
        if (widget.type) {
          widget.chart.options = GeneratorFactory[widget.type].options(widget.xparam, widget.yparam);
        }
        $uibModalInstance.close(widget);


        $timeout(function(){

          widget.chart.api.refresh();

          $interval(function(){
            console.log('Widgets settings controller');
            $scope.setKeys();
          }, widget.refreshInterval);
        },400)

        };
    }])

