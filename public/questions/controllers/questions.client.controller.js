'use strict';

//define the questions module controller
angular.module('questions').controller('QuestionsController',
  ['$scope', '$routeParams', '$location', 'Authentication', 'Questions',
    function($scope, $routeParams, $location, Authentication, Questions){

      $scope.authentication = Authentication;

      //create new question method
      $scope.create = function(){
        //use form fields to create new question $resource object
        var question = new Questions({
          category: this.category,
          actualQuestion: this.actualQuestion,
          choices: {
            answer: this.answer,
            choice1: this.choice1,
            choice2: this.choice2,
            choice3: this.choice3
          }
        });

        //save question
        question.$save(function(response){
          //if question was saved successfully, redirect to the question page
          $location.path('questions/' + response._id);
        }, function(errorResponse){
          //otherwise, present user with the error message
          $scope.error = errorResponse.data.message;
        });
      };//end create method


      //read method - get list of questions
      $scope.find = function(){
        $scope.questions = Questions.query();
      };

      //read method - get a single question by id
      $scope.findOne = function(){
        $scope.question = Questions.get({
          questionID: $routeParams.questionID
        });
        console.log($scope.question);
      };

      //update a question
      $scope.update = function(){
        $scope.question.$update(function(){
          $location.path('questions/' + question._id);
        }, function(errorResponse){
          $scope.error = errorResponse.data.message;
        });
      };

      //delete a question
      $scope.delete = function(question){
        $scope.question.$delete(function(){
          //figure out if deleting from list or from question view
          if (question) {
            question.$remove(function(){
              for(var i in $scope.questions){
                if ($scope.questions[i] === question) {
                  $scope.questions.splice(i,1);
                }
              }
            });
          }else{
            $scope.question.$remove(function(){
              $location.path('questions');
            });
          }
        });
      };


    }//end controller constructor
  ]);
