app.controller('gridboxCtrl', ['$scope', 'DashboardFactory','$timeout',
    function($scope, DashboardFactory, $timeout) {
      $scope.gridsterOptions = {
        margins: [20, 20],
        columns: 16,
        // mobileBreakPoint: 1000,
        // mobileModeEnabled: true,
        draggable: {
          handle: 'h3'
        },
        resizable: {
          enabled: true,
          handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

          // optional callback fired when resize is started
          start: function(event, $element, widget) {},

          // optional callback fired when item is resized,
          resize: function(event, $element, widget) {
            if (widget.chart.api) widget.chart.api.update();
          },

          // optional callback fired when item is finished resizing
          stop: function(event, $element, widget) {
            $timeout(function(){
              if (widget.chart.api) widget.chart.api.update();
            },400)
          }
        }
      };
     // $scope.dashboard = dashboard;

      // widget events
      $scope.events = {
        resize: function(e, scope){
          $timeout(function(){
            if (scope.api && scope.api.update) scope.api.update();
          },200)
        }
      };

      $scope.config = { visible: false, autorefresh: true };

      //make chart visible after grid have been created - TODO: change to grid.onload event
      $timeout(function(){
        $scope.config.visible = true;
      }, 200);

      //subscribe widget on window resize event
      angular.element(window).on('resize', function(e){
        $scope.$broadcast('resize');
      });

      // grid manipulation
      $scope.clear = function() {
        $scope.dashboard.charts = [];
      };

      $scope.addWidget = function() {
        $scope.dashboard.charts.push({
          name: "New Widget",
          sizeX: 4,
          sizeY: 4
        });
      };

      $scope.createCharts = function(){
        DashboardFactory.getCharts($scope.dashboard.id)
        .then(function(res){
          $scope.charts = res
        })
      }


      $scope.showCharts = function(){
        $scope.createCharts()
      }
      $scope.blarg = function(){
        console.log($scope.charts)
      }

      $scope.saveLayout = function () {
        DashboardFactory.saveLayout($scope.dashboard.id, $scope.dashboard.charts)
        .then(function (data) {
        })
      }

      $scope.findLiveCharts = function(){
        DashboardFactory.findLiveCharts($scope.charts)
        .then(function(res){
          $scope.liveCharts = res;
          console.log($scope.liveCharts);
        })
      }
    }
  ]);
