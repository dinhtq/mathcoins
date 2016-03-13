'use strict';

angular.module('quizModule').config(['$routeProvider',
  function($routeProvider){
      $routeProvider.
      when('/quiz/:quizType', {
        templateUrl: 'quiz/views/quiz.client.view.html'
      });
  }
]);
