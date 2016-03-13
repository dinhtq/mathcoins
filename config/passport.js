'use strict';


var passport = require('passport'),
	mongoose = require('mongoose');

module.exports = function(){
	console.log("in passport.js");
	var User = mongoose.model('User');

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findOne({
			_id: id
		}, '-password -salt', function(err, user){
			done(err, user);
		});
	});

	//load local strategy
	require('./strategies/local.js')();
	//load facebook strategy
	require('./strategies/facebook.js')();
};




