'use strict';

var users = require('../../app/controllers/users.server.controller'),
    questions = require('../../app/controllers/questions.server.controller');


module.exports = function(app) {
  app.route('/api/questions')
    .get(questions.list)
    .post(users.requiresLogin, questions.create);

  app.route('/api/questions/:questionID')
    .get(questions.read)
    .put(users.requiresLogin, questions.hasAuthorization, questions.update)
    .delete(users.requiresLogin, questions.hasAuthorization, questions.delete);

  app.param('questionID', questions.questionByID);

};
