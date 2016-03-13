

'use strict';




exports.render = function(req, res){

	console.log("in server index controller and req.user is: " + req.user);

	res.render('index',{
		title: 'Hello World',
		user: JSON.stringify(req.user)


	});





};