'use strict';

/*use the angular.module() method to grab the index module and executed
the config() method to create a new configuration block*/
angular.module('index').config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/', {
			templateUrl: 'index/views/index.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);
