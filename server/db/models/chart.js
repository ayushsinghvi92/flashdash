'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('chart', {
	name: Sequelize.STRING,
	dataSource: {
		type: Sequelize.STRING,
		validate: {
			isUrl: true
		}
	},
	refreshInterval: {
		type: Sequelize.INTEGER,
		validate: {
			min: 0 // in production peg this to ??
		}
	},
	type: {
		type: Sequelize.STRING //change to enum when appropriate
	},
	sizeX: {
		type: Sequelize.INTEGER
	},
	sizeY: {
		type: Sequelize.INTEGER
	},
	col: {
		type: Sequelize.INTEGER
	},
	row: {
		type: Sequelize.INTEGER
	},
	xparam: Sequelize.STRING, 
	yparam: Sequelize.STRING,
	color: {
		type: Sequelize.STRING,
		validate : {
			isColorString: function (value) {
				if(!value.match("^#[0-9a-fA-F]{6}$")) {
					throw new Error('Enter a color')
				}
			}
		}
	}
});