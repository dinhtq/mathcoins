'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	category: {
		type: String,
		default: '',
		trim: true,
		required: 'Category cannot be empty'
	},
	actualQuestion: {
		type: String,
		default: '',
		trim: true,
		required: 'Question content cannot be empty'
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	choices: {
		answer: {
			type: String,
			default: '',
			trim: true,
			required: 'answer is required'
		},
		choice1: {
			type: String,
			default: '',
			trim: true,
			required: 'option1 is required'
		},
		choice2: {
			type: String,
			default: '',
			trim: true,
			required: 'option2 is required'
		},
		choice3: {
			type: String,
			default: '',
			trim: true,
			required: 'option3 is required'
		}
	}

});


mongoose.model('Question', QuestionSchema);
