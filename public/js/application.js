var app = angular.module('test-task-1', []);

app.controller('generalCtrl', ($scope, $http) => {

	$scope.makeSearch = function() {

		showLoader(true);
		var prom = $http.post('/getData', {query: $scope.searchQuery});

		var changedThen = new Proxy(prom.then, {
			apply: (oldFunc, thisScope, argumentsList) => {
				//showLoader(false);
				oldFunc.apply(prom, argumentsList);
			}
		});
		prom.changedThen = changedThen;
		
		prom.changedThen(
			(res) => {
    		console.log(res.data);
    	}, 
    	(res) => {
    		console.log(res);
    	}
		);

		
	};

	function showLoader(status) {
		$scope.searchButtonHidden = status;
		$scope.loaderHidden = !status;
	}

	showLoader(false);
});