'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserScoreSchema = new Schema({

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  score: {
    type: Number,
    default: 0,
    required: 'Score cannot be blank'
  }

});


mongoose.model('UserScore', UserScoreSchema);
