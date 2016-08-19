app.controller('WidgetSettingsCtrl', ['$scope', 'DashboardFactory', '$timeout', '$rootScope', '$modalInstance', 'widget', 'GeneratorFactory', '$interval', 'WidgetSettingsFactory', '$uibModalInstance',
    function($scope, DashboardFactory, $timeout, $rootScope, $modalInstance, widget, GeneratorFactory, $interval,WidgetSettingsFactory, $uibModalInstance) {
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
        refreshInterval : widget.refreshInterval || 3000,
      };
      //3000 is a placeholder default value for testing, should switch to higher value when deploying. Also we need to put refreshInterval in the form logic


    let dataInNVD3Format;
     $scope.setKeys = function(){
        return WidgetSettingsFactory.newSetKeys($scope.form.dataSource)
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
            $scope.setKeys();
          }, $scope.form.refreshInterval);
        },400)

        };
    }])
