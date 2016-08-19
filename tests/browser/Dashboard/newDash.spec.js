'use strict'
/* globals module inject chai */

var expect = chai.expect;

describe('New Dashboard', function () {

	beforeEach(module('FullstackGeneratedApp'));

	describe('controller `newDashboardCtrl`', function () {
		let $scope, $state;
		beforeEach(inject(function($rootScope, $q, $controller, _$state_){
			$scope = $rootScope.new();

			userFactory = {
				addDashbaord: chai.spy(function (id, form) {
					return $q.when('added dashboard to user' + id)
				})
			}
		}))

		describe('.submit scope method', function () {
			
			it('uses the `userFactory`', function () {
				$scope.id = 12;
				$scope.form = {};
				$scope.submit();
				expect($state._mockUrl).not.to.equal('/dashboard')
				$scope.digest();
				expect($state._mockUrl).to.equal('/dashboard')
			})
		})
	})
});