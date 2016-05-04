var app = angular.module('test-task-1', []);

app.controller('generalCtrl', ($scope, $http) => {

	$scope.makeSearch = function() {

		$http.post('/getData', {query: $scope.searchQuery})
	    .success(function(data) {
	        console.log(data);
	    })
	    .error(function(data) {
	        console.log('Error: ' + data);
	    });
	}
});