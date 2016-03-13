'use strict';

//this factory will consume the user score api using the resource service
angular.module('quizModule').factory('UserScore', [ '$resource',
  function($resource){
    return $resource('api/userScores/:userId', {
      userId: '@_id'
    },
    {
      update: {
        method: 'PUT'
      }
    });
}
]);
