var app = angular.module('test-task-1', []);

app.controller('generalCtrl', ($scope, $http, $timeout) => {

	/**
	 * Send search query to server
	 */
	$scope.makeSearch = () => {

		if (!$scope.searchQuery) {
			$scope.showWarningPanel(true);
			return;
		}

		showLoader(true);
		var prom = $http.post('/getData', {query: $scope.searchQuery});

		var cbs = {
			fillfilled(res) {
				console.log('Yes');
				console.log(res.data);
			}, 
			rejected(res) {
				console.log('No');
				console.log(res);
			}
		};

		var trapCbs = [];

		Object.keys(cbs).forEach((cb) => {
			var trap = new Proxy(cbs[cb], {
				apply: function(oldFunc, thisScope, argumentsList) {
					showLoader(false);
					oldFunc.apply(null, argumentsList);
				}
			});
			trapCbs.push(trap);
		});

		prom.then.apply(prom, trapCbs);
		
	};

	function showLoader(status) {
		$scope.searchButtonHidden = status;
		$scope.loaderHidden = !status;
	}

	showLoader(false);
	$scope.warningPanelHidden = true;

	/**
	 * Hide warning panel
	 */
	$scope.showWarningPanel = (status) => {
		$scope.warningPanelHidden = !status;
		if (status) {
			$timeout(function () {
        $scope.warningPanelHidden = true;
    	}, 1000);
		}
	};
});