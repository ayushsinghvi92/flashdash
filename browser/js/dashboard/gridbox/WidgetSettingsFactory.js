app.factory('WidgetSettingsFactory', function(DashboardFactory){
  var factory = {};

  factory.newSetKeys = function(dataSource, widget){
    console.log('We are in the newSetKeys here is the widget', widget);
    return DashboardFactory.getDataSource(dataSource)
      .then(function(data){
        let realData = DashboardFactory.findDataToGraph(data);
        let dataInCorrectFormat = DashboardFactory.setDataInCorrectFormat(realData, widget)
        return [dataInCorrectFormat,Object.keys(realData[0])]
      })
  }

  return factory;
})
