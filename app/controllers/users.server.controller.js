'use strict';

var User = require('mongoose').model('User'),
	passport = require('passport');


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



exports.renderSignin = function(req, res, next){
	if (!req.user) {
		res.render('signin', {
			title: 'Sign-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else{
		return res.redirect('/');
	}
};




exports.renderSignup = function(req, res, next){
	if (!req.user) {
		res.render('signup', {
			title: 'Sign-up Form',
			messages: req.flash('error')
		});
	}
	else{
		return res.redirect('/');
	}
};


exports.signup = function(req, res, next){
	if (!req.user) {
		console.log("in signup, no req.user instance");
		var user = new User(req.body);
		var message = null;

		user.provider = 'local';

		user.save(function(err){
			if (err) {
				var message = getErrorMessage(err);

				req.flash('error', message);
				return res.redirect('/signup');
			}

			console.log("user saved");

			req.login(user, function(err){
				if (err) { return next(err) };

				console.log("login successful and redirected back to index");
				return res.redirect('/');
			});

		});
	}
	else{
		return res.redirect('/');
	}
};



exports.signout = function(req, res){
	req.logout();
	res.redirect('/');
};





/*handling user creation...*/
/*users profile details are already present, 
so have to validate them differently */
//accepts a user profile
exports.saveOAuthUserProfile = function(req, profile, done) {
	console.log("at beginning of saveOAuthUserProfile and profile is: " + JSON.stringify(profile));


	//looks for an existing user 
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, function(err, user){
		if (err) {
			return done(err);
		}
		else{
			//cannot find exisitng user
			if (!user) {

				//user findUniqueUsername to find unique username 
				//and save new user instance
				var possibleUsername = profile.username || 
					((profile.email) ? profile.email.split('@')[0] : '');

				User.findUniqueUsername(possibleUsername, null, 
					function(availableUsername){
						profile.username = availableUsername;

						user = new User(profile);

						user.save(function(err){
							

							return done(err, user);
						});
					});

			}
			//found user
			else{
				console.log("in saveOAuthUserProfile() and found user: " + user);
				console.log("in saveOAuthUserProfile() and profile is: " + JSON.stringify(profile))

				//add firstName, lastName to user
				user.firstName = profile.firstName;
				user.lastName = profile.lastName;

				console.log("in saveOAuthUserProfile() and added fname and lname to user");
				console.log("user: " + JSON.stringify(user));

				return done(err, user);
			}
		}
	});

};





exports.create = function(req, res, next){

	var user = new User(req.body);

	//save the user
	user.save(function(err){
		//catch error
		if (err) {
			return next(err);
		}
		else{
			res.json(user);
		}

	});//end saving user
};


exports.list = function(req, res, next){
	User.find({},'username email', function(err, users){
		if (err) {
			return next(err);
		}
		else{
			res.json(users);
		};
	});
};


exports.read = function(req, res){
	res.json(req.user);
};


exports.userByID = function(req, res, next, id){
	User.findOne({
		_id: id,
	}, function(err, user){
		if (err) {
			return next(err);
		}
		else{
			req.user = user;
			next();
		}
	});
};


//updating documents
exports.update = function(req, res, next){
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
		if (err) {
			return next(err);
		}
		else{
			res.json(user);
		};
	});
};



//deleting documents
exports.delete = function(req, res, next){
	req.user.remove(function(err){
		if (err) {
			return next(err);
		}
		else{
			res.json(req.user);
		}
	});
};






//authentication middleware
//----uses Passport initiated req.isAuthenticated() to check whether a user is currently 
//authenticated
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};







































