'use strict';

angular.module('index').controller('IndexController', ['$scope', '$routeParams',
	'Authentication', 'UserScore', function($scope, $routeParams, Authentication, UserScore){
	$scope.authentication =  Authentication;


	//read method that consumes userScores api to get the user score
	$scope.findUserScore = function(){
		//console.log("in findUserScore() and authentication.user is: " + JSON.stringify($scope.authentication.user));

		UserScore.get({
			userId: $scope.authentication.user._id
		}, function(response){
			$scope.userScore = response.score;
		}, function(errorResponse){
			scope.error = errorResponse.data.message;
		});
	};//end findUserScore()


}]);
