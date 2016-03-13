'use strict';


angular.module('questions').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/questions', {
        templateUrl: 'questions/views/list-questions.client.view.html'
      }).
      when('/questions/create', {
        templateUrl: 'questions/views/create-question.client.view.html'
      }).
      when('/questions/:questionID', {
        templateUrl: 'questions/views/view-question.client.view.html'
      }).
      when('/questions/:questionID/edit', {
        templateUrl: 'questions/views/edit-question.client.view.html'
      });
  }
]);
