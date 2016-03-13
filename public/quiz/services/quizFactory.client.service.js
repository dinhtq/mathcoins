'use strict';

//this factory will return a question given a question id
angular.module('quizModule').factory('quizFactory', function(){

  /* questions array that defines the current set of questions */
  var questions = [];




  //method to populate questions[] with a set of addition questions
  function loadAdditionQuestions(numberOfQuestions){
    //empty question[]
    questions = [];
    for(var i = 0; i < numberOfQuestions; i++ ){
      questions.push(generateAdditionQuestion());
    }
  };

  //method to populate questions[] with a set of subtraction Questions
  function loadSubtractionQuestions(numberOfQuestions){
    //empty question[]
    questions = [];
    for(var i = 0; i < numberOfQuestions; i++ ){
      questions.push(generateSubstractionQuestion());
    }
  };

  //method to populate questions[] with a set of multiplication Questions
  function loadMultiplicationQuestions(numberOfQuestions){
    //empty question[]
    questions = [];
    for(var i = 0; i < numberOfQuestions; i++ ){
      questions.push(generateMultiplicationQuestion());
    }
  };

  //method to populate questions[] with a set of division Questions
  function loadDivisionQuestions(numberOfQuestions){
    //empty question[]
    questions = [];
    for(var i = 0; i < numberOfQuestions; i++ ){
      questions.push(generateDivisionQuestion());
    }
  };



  /*method to generate a random substraction question */
  function generateSubstractionQuestion(){
    //initialize question object
    var objQuestion = {};

    /* create the question */
    //create random intergers
    var int1 = Math.floor((Math.random()*10000) + 1);
    var int2 = Math.floor((Math.random()*int1) + 1);
    //concat integers and push to objQuestion
    var strQuestion = int1 + " - " + int2;
    objQuestion["question"] = strQuestion;

    /*create the options array and insert the answer in a random index from 0 to 4 */
    var options = [];
    var intRandomIndex = Math.floor((Math.random() * 4) + 0);
    options[intRandomIndex] = int1 - int2;
    //generate the other options
    for(var i = 0; i < 4; i++){
      if (i !== intRandomIndex) {
        options[i] = Math.floor((Math.random() * int1) + 0);
      }
    }
    objQuestion["options"] = options;

    //create answer key
    objQuestion["answer"] = intRandomIndex;

    return objQuestion;
  };//end generateSubstractionQuestion method



  /* method to generate a random addition question */
  function generateAdditionQuestion(){

    //initialize question object
    var objQuestion = {};

    /* create the question */
    //create random integers
    var int1 = Math.floor((Math.random()*10000) + 1);
    var int2 = Math.floor((Math.random()*10000) + 1);
    //concat integers and push to objQuestion
    var strQuestion = int1 + " + " + int2;
    objQuestion["question"] = strQuestion;

    /*create the options array and insert the answer in a random index from 0 to 4 */
    var options = [];
    var intRandomIndex = Math.floor((Math.random() * 4) + 0);
    options[intRandomIndex] = int1 + int2;
    //generate the other options
    for(var i = 0; i < 4; i++){
      if (i !== intRandomIndex) {
        options[i] = Math.floor((Math.random() * 10000) + 0);
      }
    }
    objQuestion["options"] = options;

    //create answer key
    objQuestion["answer"] = intRandomIndex;

    return objQuestion;

  };//end generateAdditionQuestion() function


  /* method to generate a division question */
  function generateDivisionQuestion(){
    //initialize question object
    var objQuestion = {};

    //create question components - random integers
    var divisor = Math.floor((Math.random()*10) + 1);
    var quotient = Math.floor((Math.random()*10) + 0);
    var dividend = divisor * quotient;

    //concat integers and push to objQuestion
    var strQuestion = dividend + " / " + divisor;
    objQuestion["question"] = strQuestion;

    /*create the options array and insert the answer in a random index from 0 to 4 */
    var options = [];
    var intRandomIndex = Math.floor((Math.random() * 4) + 0);
    options[intRandomIndex] = quotient;
    //generate the other options
    for(var i = 0; i < 4; i++){
      if (i !== intRandomIndex) {
        options[i] = Math.floor((Math.random() * 10) + 0);
      }
    }
    objQuestion["options"] = options;

    //create answer key
    objQuestion["answer"] = intRandomIndex;

    return objQuestion;

  };

  /* method to generate a multiplication question */
  function generateMultiplicationQuestion(){
    //initialize question object
    var objQuestion = {};

    //create question components - random integers
    var int1 = Math.floor((Math.random()*13) + 0);
    var int2 = Math.floor((Math.random()*13) + 0);
    var product = int1 * int2;

    //concat integers and push to objQuestion
    var strQuestion = int1 + " * " + int2;
    objQuestion["question"] = strQuestion;

    /*create the options array and insert the answer in a random index from 0 to 4 */
    var options = [];
    var intRandomIndex = Math.floor((Math.random() * 4) + 0);
    options[intRandomIndex] = product;
    //generate the other options
    for(var i = 0; i < 4; i++){
      if (i !== intRandomIndex) {
        options[i] = Math.floor((Math.random() * 145) + 0);
      }
    }
    objQuestion["options"] = options;

    //create answer key
    objQuestion["answer"] = intRandomIndex;

    return objQuestion;

  };











  /*
  var questions = [
		{
			question: "Which is the largest country in the world by population?",
			options: ["India", "USA", "China", "Russia"],
			answer: 2
		},
		{
			question: "When did the second world war end?",
			options: ["1945", "1939", "1944", "1942"],
			answer: 0
		},
		{
			question: "Which was the first country to issue paper currency?",
			options: ["USA", "France", "Italy", "China"],
			answer: 3
		},
		{
			question: "Which city hosted the 1996 Summer Olympics?",
			options: ["Atlanta", "Sydney", "Athens", "Beijing"],
			answer: 0
		},
		{
			question: "Who invented telephone?",
			options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
			answer: 1
		}
	];
  */


  return {
    getQuestion: function(id) {
        if(id < questions.length){
          return questions[id];
        } else{
          return false;
        }
    },
    loadAdditionQuestions: function(numberOfQuestions) {
      loadAdditionQuestions(numberOfQuestions);
      return true;
    },
    loadMultiplicationQuestions: function(numberOfQuestions) {
      loadMultiplicationQuestions(numberOfQuestions);
      return true;
    },
    loadDivisionQuestions: function(numberOfQuestions) {
      loadDivisionQuestions(numberOfQuestions);
      return true;
    },
    loadSubtractionQuestions: function(numberOfQuestions) {
      loadSubtractionQuestions(numberOfQuestions);
      return true;
    }
  };


});
