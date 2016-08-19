app.factory('WidgetSettingsFactory', function(DashboardFactory){
  var factory = {};

  factory.newSetKeys = function(dataSource){
    return DashboardFactory.getDataSource(dataSource)
      .then(function(data){
        var realData = DashboardFactory.findDataToGraph(data);
        var dataInNVD3Format = [{
          values:realData,
          key: "this works",
          color: '#ff7f0e'
        }];
        return [dataInNVD3Format,Object.keys(realData[0])]
      })
  }
  return factory;
})
