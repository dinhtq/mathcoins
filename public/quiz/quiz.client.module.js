'use strict';
//initialize module
var quizModule = angular.module('quizModule', []);




quizModule.directive('myQuiz', ['UserScore', 'quizFactory', '$location', '$routeParams', 'Authentication',
  function(UserScore, quizFactory, $location, $routeParams, Authentication){
  return {
    restrict: 'AE', //attribute and element directive types
    scope: {}, //isolate scope
    templateUrl: 'quiz/templates/quizTemplate.html',
    link: function(scope, element, attrs){

      console.log($routeParams.quizType);

      scope.authentication = Authentication;

      scope.challenge = $routeParams.quizType;

      scope.numberOfQuestions = 3;

      scope.start = function(){
        scope.id = 0; //id of the current question
        scope.quizOver = false;
        scope.inProgress = true;
        //initialize questions in quizFactory
        loadQuestions(scope.numberOfQuestions);

        scope.getQuestion();
      };

      scope.reset = function(){
        scope.inProgress = false;
        scope.score = 0;
      };

      scope.getQuestion = function(){
        //get a question object by calling the quizFactory getQuestion() method
        var q = quizFactory.getQuestion(scope.id);


        if(q) {
          scope.question = q.question;
          scope.options = q.options;
          scope.answer = q.answer;
          scope.answerMode = true;
        }else{
          scope.quizOver = true;

          //check if user has a score already
          //if true, update the user score,
          //else, create and save the user score
          console.log("userID: " + scope.authentication.user._id);
          scope.existingUserScore = UserScore.get({
            userId: scope.authentication.user._id
          }, function(response){
            // update user score

            scope.userScore = response;
            console.log("scope.userScore: " + JSON.stringify(scope.userScore));
            updateScore();

          }, function(errorResponse){
            //user first time taking and finishing a quiz
            //save score to db
            saveScore(scope.score);

          });
        }
      };//end getQuestion



      scope.checkAnswer = function(){
        console.log("in checkAnswer()");
        if(!$('input[name=answer]:checked').length) return;

        var ans = $('input[name=answer]:checked').val();

        console.log("you selected: " + ans);

        if(ans == scope.options[scope.answer]) {
          scope.score++;
          scope.correctAns = true;
        } else{
          scope.correctAns = false;
        }

        scope.answerMode = false;
      };

      scope.nextQuestion = function(){
        scope.id++;
        scope.getQuestion();
      };

      scope.reset();


      //method to initialize questions[] in quizFactory
      function loadQuestions(numberOfQuestions){
        switch($routeParams.quizType){
          case "addition":
            quizFactory.loadAdditionQuestions(numberOfQuestions);
            break;
          case "subtraction":
            quizFactory.loadSubtractionQuestions(numberOfQuestions);
            break;
          case "division":
            quizFactory.loadDivisionQuestions(numberOfQuestions);
            break;
          case "multiplication":
            quizFactory.loadMultiplicationQuestions(numberOfQuestions);
            break;

        }

      };





      function saveScore(score) {
        console.log("in saveScore");
        var userScore = new UserScore({
          score: score
        });

        userScore.$save(function(response){

        }, function(errorResponse){
          scope.error = errorResponse.data.message;
        });
      };


      function updateScore(){
        console.log("in updateScore()");
        console.log("existingUserScore: " + JSON.stringify(scope.existingUserScore));

        var updateScore = new UserScore({
          score: scope.score
        });

        updateScore.$update({
          userId: scope.existingUserScore.user
        },function(response){

        }, function(errorResponse){
          scope.error = errorResponse.data.message;
        });




      };



    }//end link function
  }
}]);
