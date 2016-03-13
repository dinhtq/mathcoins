'use strict';

//load relevant controllers to bind functions and middlewares to url routes
var users = require('../controllers/users.server.controller.js'),
    userScores = require('../controllers/userScores.server.controller.js');


module.exports = function(app) {
  app.route('/api/userScores')
    .post(userScores.create);

  app.route('/api/userScores/:userId')
    .get(userScores.read)
    .put(userScores.update);

  app.param('userId', userScores.userScoreByUserID);

};
