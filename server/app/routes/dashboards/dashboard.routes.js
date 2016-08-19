const router = require('express').Router();
const db = require('../../../db')
const Dashboard = db.model('dashboard')
const Chart = db.model('chart')
module.exports = router;
router.get('/:id', function (req,res,next) {
	Dashboard.findById(req.params.id, {
		include : [Chart]
	})
	.then(data => res.send(data))
	.catch(next)
});

router.get('/:id/charts', function(req, res, next){
	Chart.findAll({
		where: {
			dashboardId : req.params.id
		}
	}).then(data => res.send(data))
	.catch(next)
})

router.put('/:id', function (req,res,next) { //make this a dashboard instance method
	let dashboard;
	Dashboard.findById(req.params.id,{
		include: [Chart]
	})
	.then(function (_dashboard) {
		dashboard = _dashboard;
		return dashboard.getCharts()
	})
	.then(function (charts) {
		let deletingCharts = charts.map(function (e) {
			return Chart.destroy({
				where : {
					id: e.id
				}
			})
		})
		return Promise.all(deletingCharts)
	})
	.then(function () {
		let creatingCharts = req.body.map(function (e) {
			return dashboard.createChart(e)
		})

		return Promise.all(creatingCharts)
	})
	.then(function (charts) {
		let addingCharts = charts.map(function (e) {
			return dashboard.addCharts(e)
		})
		return Promise.all(addingCharts)
	})
	.then(addedCharts => res.send(dashboard))
	.catch(next)
})
