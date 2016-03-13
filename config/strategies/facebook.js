var passport = require('passport'),
	url = require('url'),
	FacebookStrategy = require('passport-facebook').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

//register facebook strategy
module.exports = function(){
	passport.use(new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: config.facebook.callbackURL,
		passReqToCallback: true,
		profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name']
	},
	function(req, accessToken, refreshToken, profile, done){
		var providerData = profile._json;
		providerData.accessToken = accessToken;
		providerData.refreshToken = refreshToken;

		console.log("in facebooks.js and callback profile is: " + profile);

		var providerUserProfile = {
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			fullName: profile.displayName,
			email: profile.emails[0].value,
			username: profile.displayName,
			provider: 'facebook',
			providerId: profile.id,
			providerData: providerData
		};

		console.log("got providerUserProfile " + providerUserProfile.firstName);




		//autheticate the current user
		users.saveOAuthUserProfile(req, providerUserProfile, done);
	}));
};








