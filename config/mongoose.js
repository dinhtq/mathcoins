'use strict';


var config = require('./config'),
	mongoose = require('mongoose'); //require mongoose module

module.exports = function(){

	//connect to mongoose instance
	var db = mongoose.connect(config.db);

	//load the User model
	require('../app/models/user.server.model');
	//load the Article model
	require('../app/models/article.server.model');
	//load the Question model
	require('../app/models/question.server.model');
	//load the UserScore model
	require('../app/models/userScores.server.model.js');

	return db;
}
