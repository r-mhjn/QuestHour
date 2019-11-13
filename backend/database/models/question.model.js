const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	question: String,
	options: [String],
	correct: Number,
	marks: Number,
	author: String,
}, {
		timestamps: true
	});

module.exports = new mongoose.model('Question', questionSchema);