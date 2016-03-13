'use strict';


//set the environment variable
/*****************************


It is recommended that you set the NODE_ENV environment variable in your operating system prior to running your application.
In a Windows environment, this can be done by executing the following command in your command prompt:
           > set NODE_ENV=development
While in a Unix-based environment, you should simply use the following export command:
           $ export NODE_ENV=development


******************************/


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//call mongoose mongoose
var mongoose = require('./config/mongoose'),
//call express function
	express = require('./config/express'),
	passport = require('./config/passport');


//connect to mongodb
var db = mongoose();
//fetch express app
var app = express();
var passport = passport();

// use the express app instance to listen to the '3000' port
app.listen(3000);


console.log('Server running at http://localhost:3000/');

//use the module.exports property to expose our Express application instance for external use
module.exports = app;