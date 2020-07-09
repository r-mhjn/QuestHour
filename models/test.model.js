const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	name: String,
	questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
	minutes: [String],
	author: String,
}, {
	timestamps: true
});

module.exports = new mongoose.model('Test', questionSchema);