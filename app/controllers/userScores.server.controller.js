'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
  UserScore = mongoose.model('UserScore'),
	async = require('async'),
	_ = require('underscore');


var getErrorMessage = function(err){
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}
	else{
		for( var errName in err.errors) {
			if (err.errors[errName].message){
				message = err.errors[errName].message;
			}
		}
	}

	return message;
};



exports.create = function(req, res){

  //get the userScore object from the req object
  var userScore = new UserScore(req.body);

	console.log("in userScore create() and req.user is:" + req.user);

  userScore.user = req.user;

  //save userScore to db
  userScore.save(function(err){
    if(err) {
      return res.status(400).send({
        message: 'Unable to create a new user score'
      });
    }else{
      res.json(userScore);
    }

  });
};//end create

//middleware - get the user score by user ID and attach to req object
exports.userScoreByUserID = function (req, res, next, id){
	console.log("in userScoreByUserID()");
  UserScore.findOne({user: id}, function(err, userScore){

      if (err) {
				console.log("error dude");
				return next(err);
			}
      if(!userScore) { return next( new Error('Failed to load user score! userID ' + id))};

      req.userScore = userScore;

      next();
  });

};



//returns exisiting user score
exports.read = function(req, res) {
	console.log("in read()");
	console.log("req.userScore: " + req.userScore);
  res.json(req.userScore);
};




//updating a user score
exports.update = function(req, res){
	console.log("in user score update()");
	console.log("req.userScore: " + req.userScore);
	console.log("req.body.score: " + req.body.score);

  //get the current user score from the req
  var userScore = req.userScore;

  //update the current score with the score from the req body
  userScore.score = req.userScore.score + req.body.score;

  //save the updated user score to db
  userScore.save(function(err){
    if(err){
      return res.status(400).send({
        message: 'Unable to update user score!'
      });
    }else{
      res.json(userScore);
    }

  });
};
