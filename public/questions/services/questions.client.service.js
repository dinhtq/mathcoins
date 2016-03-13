'use strict';

angular.module('questions').factory('Questions',['$resource',
  function($resource){
      return $resource('api/questions/:questionID', {
        questionID: '@_id'
      },
    {
      update: {
        method: 'PUT'
      }
    });
  }
]);
