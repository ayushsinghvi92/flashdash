app.controller('gridboxCtrl', ['$uibModal', '$scope', 'DashboardFactory','$timeout', 'WidgetSettingsFactory', '$rootScope', '$mdToast', '$interval', '$mdDialog', '$state',
    function($uibModal, $scope, DashboardFactory, $timeout, WidgetSettingsFactory, $rootScope, $mdToast, $interval, $mdDialog, $state) {
      $scope.gridsterOptions = {
        margins: [25, 25],
        columns: 16,
        // mobileBreakPoint: 1000,
        // mobileModeEnabled: true,
        draggable: {
          enabled: $scope.editable,
          handle: 'h3'
        },
        resizable: {
          enabled: $scope.editable,
          handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

          // optional callback fired when resize is started
          start: function(event, $element, widget) {},

          // optional callback fired when item is resized,
          resize: function(event, $element, widget) {
            if (widget.chart.api) widget.chart.api.update();
          },

          // optional callback fired when item is finished resizing
          stop: function(event, $element, widget) {
            console.log(widget)
            $timeout(function(){
              if (widget.chart.api) widget.chart.api.update();
            },400)
          }
        }
      };

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

      $scope.$on('$destroy', function() {
        $scope.dashboard.charts.forEach(function(chart) {
          if (chart.intervalEnder) {
            console.log("Cancel is returning", $interval.cancel(chart.intervalEnder), "for", chart.name || "unknown graph");
          }
        })
      })

      // grid manipulation
      $scope.clear = function() {
          $scope.dashboard.charts.forEach(function(chart) {
          if (chart.intervalEnder) {
            console.log("Cancel is returning", $interval.cancel(chart.intervalEnder), "for", chart.name || "unknown graph");
          }
        })
        $scope.dashboard.charts = [];
      };

      $scope.addNewGraph = function () {
        if (!$scope.dashboard) {
          var confirm = $mdDialog.confirm()
          .title('You need to make a dashboard first!')
          .ariaLabel('No Dashboard')
          .targetEvent(event)
          .ok('Create Dashboard', $state.go('user'))
          $mdDialog.show(confirm);
        }else{
          $uibModal.open({
          scope: $scope,
          templateUrl: '/js/dashboard/newGraph/newGraph.html',
          controller: 'newGraphCtrl'
        })
        }

      }

      $scope.saveLayout = function () {
        DashboardFactory.saveLayout($scope.dashboard.id, $scope.dashboard.charts)
      }

      $scope.toggleEditable = function(forced) {
        $scope.editable = (typeof forced === "undefined") ? ! $scope.editable : forced;
        $scope.gridsterOptions.draggable.enabled = $scope.editable;
        $scope.gridsterOptions.resizable.enabled = $scope.editable;
       }

      $scope.showToast1 = function() {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Dashboard Saved!')
            .hideDelay(2000)
            .theme('success-toast')
            .position('bottom')
        );
      };

      $scope.showToastForEditing = function(editable) {
        let response = editable ? 'editing enabled' : 'editing disabled';
        let theme = editable ? 'success-toast' : 'warning';
        $mdToast.show(
          $mdToast.simple()
            .textContent(response)
            .hideDelay(1000)
            .theme(theme)
            .position('top')
        );
      };
    },

  ]);
