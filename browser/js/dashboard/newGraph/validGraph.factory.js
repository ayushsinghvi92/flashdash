//moment is a global variable
app.factory('validGraphFactory', function () {
	return {
		getKeysAndTypes : function (arrayOfData) {
			let keysAndTypes = {};
			let dataObj = arrayOfData[0];
			for(let key in dataObj) {
				if(typeof dataObj[key]!= 'string') {
					keysAndTypes[key] = typeof dataObj[key]
				} else if(moment(dataObj[key], moment.ISO_8601).isValid()) {
					keysAndTypes[key] = 'date'
				} else if (!isNaN(Number(dataObj[key]))) {
					keysAndTypes[key] = 'number'
				} else if (typeof dataObj[key] === 'object') { 
					//null is an object - and we cannot display object data anyway
					//do nothing
				}else {
					keysAndTypes[key] = typeof dataObj[key]
				}
			}	
			return keysAndTypes;
		},

		getValidGraphTypes : function (xtype, ytype) {

		// VALIDATION LOGIC
			
			let validGraphTypes = [];
			
			// IF ONLY X IS SELECTED - HISTOGRAM WITH Y AS THE FREQUENCY - X CAN BE EITHER A STRING OR NUMBER
			
			if(!ytype && xtype) {
				validGraphTypes.push('histogram');
				return validGraphTypes;
			}

			else if (ytype && !xtype) {
				validGraphTypes.push('lineChart')
				validGraphTypes.push('scatterChart')
				return validGraphTypes
			}
			else if (ytype === 'number') {
			
			// IF Y IS NUMBER AND =======>
			
				if(xtype === 'string') {
			
				// X IS STRING - BAR CHART OR PIE
			
					validGraphTypes.push('discreteBarChart')
					validGraphTypes.push('pieChart')
					return validGraphTypes
				} else if (xtype === 'date') {
			
				// X IS DATE- LINE CHART OR BAR CHART
			
					validGraphTypes.push('lineChart')
					validGraphTypes.push('discreteBarChart')
					return validGraphTypes
				} else if (xtype === 'number') {
			
				// X IS NUMBER - SCATTER CHART OR LINE OR BAR
			
					validGraphTypes.push('scatterChart')
					validGraphTypes.push('lineChart')
					validGraphTypes.push('discreteBarChart')
					return validGraphTypes
				}
			}
	
		// POST MVP:
		// IF DATA HAS OPEN, HIGH, LOW, CLOSE - CANDLESTICK CHART - POST MVP
		// IF MULTIPLE Y SOURCES AND X IS A NUMBER OR DATE - MULTILINE CHART OR STACKED AREA CHART
		
			return validGraphTypes;
		}

	}
});
