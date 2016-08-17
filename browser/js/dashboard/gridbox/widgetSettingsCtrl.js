  app.controller('WidgetSettingsCtrl', ['$scope', 'DashboardFactory', '$timeout', '$rootScope', '$modalInstance', 'widget', 'GeneratorFactory',
    function($scope, DashboardFactory, $timeout, $rootScope, $modalInstance, widget, GeneratorFactory) {
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
        xparam: widget.xparam
      };


    let dataInNVD3Format;
     $scope.setKeys = function(){
      DashboardFactory.getDataSource($scope.form.dataSource)
      .then(function(data){
        let realData = findDataToGraph(data);
        if (!realData) {
          var realData = [data];
        }
        $scope.dataKeys = Object.keys(realData[0]);
        dataInNVD3Format = [{
          values:realData,
          key: "this works",
          color: '#ff7f0e'
        }];
        widget.chart.data = dataInNVD3Format;
      })

     }

  function findDataToGraph(obj){
    if(Array.isArray(obj)){
      return obj;
    }else if(typeof(obj) === 'object'){
      var x;
      for(var key in obj){
       x = findDataToGraph(obj[key]);
       if(x){
        return x;
       }
      }
    }
  }

      $scope.dismiss = function() {
        $modalInstance.dismiss();
      };

      $scope.remove = function() {
        $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
        $modalInstance.close();
      };

      $scope.submit = function() {
        angular.extend(widget, $scope.form);
        //update with new options
        if (widget.type) {
          widget.chart.options = GeneratorFactory[widget.type].options(widget.xparam, widget.yparam);
        }
        $modalInstance.close(widget);

        $timeout(function(){
          widget.chart.api.refresh();
        },0)

        //update new chart
      };

    }
  ])
