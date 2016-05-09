var app = angular.module('test-task-1', []);

app.controller('generalCtrl', ($scope, $http, $timeout) => {

	/**
	 * Send search query to server
	 */
	$scope.makeSearch = () => {

		if (!$scope.searchQuery) {
			$scope.showMessagePanel(true);
			return;
		}

		showLoader(true);
		$scope.resultQueryHidden = true;
		var prom = $http.post('/getData', {query: $scope.searchQuery});

		var cbs = {
			fulfilled(res) {

				if (Object.getPrototypeOf(res) !== Object.prototype || !'data' in res || res.data.success !== true) {
					$scope.showMessagePanel(true, 'error');
					return;
				}
				$scope.query = res.data;
				$scope.resultQueryHidden = false;
			}, 
			rejected(res) {
				$scope.showMessagePanel(true, 'error');
			}
		};

		var trapCbs = [];

		/**
		 * This action need to avoid duplication of call "showLoader" function which
		 * is required to call in order to hide loader in every case: 
		 * either promise performed successfully or failed
		 */
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
	$scope.messagelPanelHidden = true;
	$scope.resultQueryHidden = true;
	$scope.messagePanelComponentsData = {
		class: '',
		title: '', 
		message: ''
	};

	/**
	 * Hide warning panel
	 */
	$scope.showMessagePanel = (status, typeMessage = 'warning') => {
		setMessagePanelComponent(typeMessage);
		$scope.messagelPanelHidden = !status;
		if (status) {
			$timeout(function () {
        $scope.messagelPanelHidden = true;
    	}, 1000);
		}
	};

	/**
	 * Set message-panel attributes before showing
	 */
	function setMessagePanelComponent(type) {
		var types = {
			warning: ['warning', 'Warning!', 'Please, type query string!'], 
			error: ['danger', 'Error!', 'Some unexpected error has arised!']
		};
		$scope.messagePanelComponentsData = {
			class: 'alert alert-dismissible messagePanel alert-' + types[type][0],
			title: types[type][1], 
			message: types[type][2]
		};
	};
});