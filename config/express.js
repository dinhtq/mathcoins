'use strict';


var config = 	require('./config'),
				express = require('express'),
				morgan = require('morgan'),
				compress = require('compression'),
				bodyParser = require('body-parser'), //provides middleware to handle request data
				methodOverride = require('method-override'), //provides DELETE and PUT HTTP verbs legacy support
				session = require('express-session'),
				flash = require('connect-flash'), //storing temp data in session flash object
				passport = require('passport'); //authentication

module.exports = function(){
	//create express app instance
	var app = express();

	/****BEGIN CONFIGURATION*********************************************************************************
	**************************************************************************************************/

	//decide which modules to use depending on environment
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}
	else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	};

	//always use these modules
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	//configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	//set the app view engine and 'views' folder
	app.set('views', './app/views');
	app.set('view engine', 'ejs');


	//configure flash messages middleware
	app.use(flash());

	//register passport initialize() middleware - bootstrap Passport module
	app.use(passport.initialize());

	//register passport session() middleware - use Express session to keep track
	//of user's session
	app.use(passport.session());




	//load route files
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/articles.server.routes.js')(app);
	require('../app/routes/questions.server.routes.js')(app);
	require('../app/routes/userScores.server.routes.js')(app);

	//define root of where to load and serve static files
	app.use(express.static('./public'));

	/****END CONFIGURATION*********************************************************************************
	**************************************************************************************************/


	//do stuff with the app instance******************************************************************/
	/******************************************************************************************************/



	console.log("returning app from express.js");
	return app;
};
