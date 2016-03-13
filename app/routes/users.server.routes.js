'use strict';

var users = require('../controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app){
	
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}));

	app.get('/oauth/facebook', passport.authenticate('facebook', {
		
		failureRedirect: '/signin'
	}));

	app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
		//scope: ['id', 'displayName', 'email'],
		failureRedirect: '/signin',
		successRedirect: '/'
	}));

	app.get('/signout', users.signout);

}