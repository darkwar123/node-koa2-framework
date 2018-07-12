const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
	name: {
		trim: true,
		type: String,
		required: true,
	},
	avatar: {
		trim: true,
		type: String,
	},
});

module.exports = schema;