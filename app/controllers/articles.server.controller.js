'use strict';


var mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	User = mongoose.model('User'),
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




/*
Create method
- use HTTP request body as the JSON base object for the document
*/

exports.create = function(req, res){



	console.log("in articles create() and req.user is: " + req.user);

	var article = new Article(req.body);



	article.creator = req.user;

	console.log("article.creator is: " + article.creator.fullName);

	//save to mongoDB
	article.save(function(err){
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}
		else{
			res.json(article);
		}
	});
};






/*
Read methods
*/

//read middleware, get all articles and attach to req obj
exports.getArticlesMiddleware = function(req, res, next){
	console.log("in getArticlesMiddleware");

	//get all articles
	Article.find().sort('-created').populate('creator', 'firstName lastName fullName', function(err, articles){
		console.log("hello");
	})
		.exec(function(err, articles){
			console.log("Article.find() success");

			if (err) {
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			}else{
				//attach articles to the req object
				req.articles = articles;
				//console.log("articles: " + articles);
				console.log("in getArticlesMiddleware else ...next()");
				next();
			}

		});


	//console.log("req obj: " + JSON.stringify(req.articles));

		//iterate through articles to add firstName, lastName and fullName to
		//each article creator
		/*for(var i = 0; i < articles.length; i++){
			console.log("start for loop and ith article is:" + articles[i]);

			if (typeof articles[i].creator.firstName === 'undefined') {
				//console.log(articles[i]);

				//get article creator id
				User.findOne({ '_id': articles[i].creator._id }, function(err, person){
					if(err) { return next(err)};
					if (!person) { return next(new Error('Failed to find user'))};

					//try to get article creatorId and use user providerData
					//name to make fullName
					var userName = "";

					console.log("found person and person is: " + person);
					//return providerData name
					userName =  person.providerData.name;

					//assign username value to article creator
					var splitName = userName.split(' ');
					//articles[i].creator.fullName = userName;
					//articles[i].creator.firstName = splitName[0] || '';
					//articles[i].creator.lastName = splitName[1] || '';

					console.log("ith article: " + articles[i]);


				});

			};

			if (i == articles.length-1) {
				console.log("done looping");
				doneArticlesLooping = true;
			};

		}end for loop*/


}




//middleware
//retrieves an array of fb-athenticated user objects and attaches it to the request object
exports.getListOfFBcreators = function(req, res, next){

	User.find( { "provider": "facebook"} , function(err, fbUsers){

		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			req.fbUsers = fbUsers;
			next();
		}

	});


};





exports.getModifiedArticles = function(req, res){
	console.log("in getModifiedArticles");

	//iterate through req.articles and reference req.fbUsers to grab the creator firstName
	//and lastName and add to req.articles
	for( var i = 0; i < req.articles.length; i++){
		//if creator object does not have firstName, then its a fbUser
		if (typeof req.articles[i].creator.firstName === 'undefined') {
			//assign article creatorID to creatorID
			var creatorID = req.articles[i].creator._id;


			//find fbUser object with the creatorID
			var objTargetFBuser = _.find(req.fbUsers, function(obj) { return obj.id == creatorID });

			//assign target fbUser providerData.name to the article
			req.articles[i].creator.fullName = objTargetFBuser.providerData.name;

			console.log(req.articles[i].fullName);

		}

	}

	console.log(req.articles);
	res.json(req.articles);
}










//retrieves a particular article
//--middleware
exports.articleByID = function(req, res, next, id){


	if (req.user.provider == "facebook") {
		var splitName = req.user.providerData.name.split(' ');
		req.user.firstName = splitName[0] || '';
		req.user.lastName = splitName[1] || '';

	};

	console.log("in articleByID and req.user is: " + req.user);

	Article.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, article){
		if (err) { return next(err)};
		if (!article) { return next(new Error('Failed to load article ' + id))};

		console.log("no error in articleByID... and article is: " + article);




		req.article = article;
		next();
	});
};


exports.read = function(req, res){
	console.log("in articles controller read()");



		//get article creator id
		User.findOne({ '_id': req.article.creator._id }, function(err, person){
			if(err) { return next(err)};
			if (!person) { return next(new Error('Failed to find user'))};

			//try to get article creatorId and use user providerData
			//name to make fullName
			var userName = "";

			console.log("found person and person is: " + person);
			//return providerData name
			userName =  person.providerData.name;

			//assign username value to article creator
			var splitName = userName.split(' ');
			req.article.creator.fullName = userName;
			req.article.creator.firstName = splitName[0] || '';
			req.article.creator.lastName = splitName[1] || '';

			console.log("req.article.creator.fullName: " + req.article.creator.fullName);

			console.log("end of read()");
			res.json(req.article);


		});




};







//update method
//--- use existing article object as the base object, and then update the title
//and content fields using the HTTP request body
//--makes the assumption that you already obtained the article object in the
//articleByID() middleware
exports.update = function(req, res){
	var article = req.article;

	article.title = req.body.title;

	article.content = req.body.content;

	article.save(function(err){
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}
		else{
			res.json(article);
		}
	})
};








/*
delete method
*/
exports.delete = function(req, res){
	var article = req.article;

	article.remove(function(err){
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}
		else{
			res.json(article);
		}
	});
};






//authorization middleware used to authroize an article operation
exports.hasAuthorization = function(req, res, next){
	// if the current user is not the creator of the article send the appropriate error message
	if (req.article.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	//call the next middleware
	next();
};
