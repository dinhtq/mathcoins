'use strict';

angular.module('quizModule').controller('QuizController',
  ['$scope', '$routeParams', '$location', 'Authentication',
  function($scope, $routeParams, $location, Authentication){

    $scope.authentication = Authentication;


  }
]);
