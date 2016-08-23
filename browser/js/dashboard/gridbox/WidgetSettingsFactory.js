app.factory('WidgetSettingsFactory', function(DashboardFactory, $interval){
  var factory = {};

  factory.newSetKeys = function(dataSource, widget){
    return DashboardFactory.getDataSource(dataSource)
      .then(function(data){
        let realData = DashboardFactory.findDataToGraph(data);
        let dataInCorrectFormat = DashboardFactory.setDataInCorrectFormat(realData, widget)
        console.log("++ Infamous line 9 at", new Date(), "for chart", widget.name || "unknown");
        return [dataInCorrectFormat,Object.keys(realData[0])]
      })
  }

  factory.stopTicking = function(widget) {
    if(widget.intervalEnder) {
        console.log("Canceling previous interval ticking in stopTicking: ", $interval.cancel(widget.intervalEnder), "on chart", widget.name || "unknown");
        widget.intervalEnder = null;
    }
  }

  factory.startTicking = function(widget) {
    factory.stopTicking(widget);
    factory.newSetKeys(widget.dataSource, widget)
    .then(function(res){
      widget.chart.data = res[0];
    });

    if (widget.refreshInterval) {
      console.log("Setting refresh interval", widget.refreshInterval, "on chart", widget.name || "unknown")
      widget.intervalEnder = $interval(function(){
        factory.newSetKeys(widget.dataSource, widget)
        .then(function(res){
          widget.chart.data = res[0];
        })
      }, widget.refreshInterval)
    }
  }

  return factory;
})
