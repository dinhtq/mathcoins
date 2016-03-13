'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
  Question = mongoose.model('Question'),
	async = require('async'),
	_ = require('underscore');




/* Extract a simple error message from the Mongoose error object and provide it
to your controller methods
*/
var getErrorMessage = function(err){
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				return err.errors[errName].message;
			};
		}
	}
	else{
		return 'Unknown server error';
	}
};


// authorization middleware
// check to see if authenticated user is creator
exports.hasAuthorization = function(req, res, next){
	//check to see if user id is same as question creator id
	//if not, throw error
	if(req.question.creator.id !== req.user.id){
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();

}




//create a Question and save to DB
//- use HTTP request body as the JSON base object for the document

exports.create = function(req, res){
  console.log("in questions create");

  var question = new Question(req.body);

  question.creator = req.user;

  //save question to mongoDB
  question.save(function(err){
    if (err) {
      return res.status(400).send({
        message: 'Unable to save question'
      });
    }
    else{
      res.json(question);
    }
  });
};


//get a list of all the questions
exports.list = function(req, res){
	Question.find().sort('-created').populate('firstName lastName fullName')
		.exec(function(err, questions){
				//catch error
				if (err) {
					return res.status(400).send({
						message: 'Unable to get list of questions'
					});
				}else{
					res.json(questions);
				}
		});
};



//middleware
//get a particular question and attach to request object
exports.questionByID = function(req, res, next, id){
	Question.findById(id).populate('creator', 'firstName lastName fullName')
		.exec(function(err, question){
				if(err) { return next(err)};
				if(!question) { return next(new Error( 'Failed to load question: ' + id))};

				req.question = question;
				next();
		});
};


//returns an existing question
exports.read = function(req, res){

	//get article creator id
	User.findOne({ '_id': req.question.creator }, function(err, person){
		if(err) { return next(err)};
		if (!person) { return next(new Error('Failed to find user'))};



		//try to get article creatorId and use user providerData
		//name to make fullName
		var userName = "";

		console.log("found person and person is: " + person);

		if (person.provider == 'facebook') {
			//return providerData name
			userName =  person.providerData.name;

			//assign username value to article creator
			var splitName = userName.split(' ');
			req.question.creator.fullName = userName;
			req.question.creator.firstName = splitName[0] || '';
			req.question.creator.lastName = splitName[1] || '';
		}




		console.log("end of read() and req.question is: " + req.question);
		res.json(req.question);


	});


};



//update an existing question
//assumes there is an existing question obj by way of the questionByID middleware
exports.update = function(req, res){
	//get the question from the req body
	var question = req.question;
	//update the question properties
	question.actualQuestion = req.body.actualQuestion;
	question.answer = req.body.choices.answer;
	question.choices.choice1 = req.body.choices.choice1;
	question.choices.choice2 = req.body.choices.choice2;
	question.choices.choice3 = req.body.choices.choice3;

	question.save(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(question);
		}
	});

};




//delete a question
exports.delete = function(req, res){

		var question = req.question;

		question.remove(function(err){
			if(err){
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			}else{
				res.json(question);
			}
		})
}
